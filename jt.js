"use strict";

(function(ctx, factory) {
	if (typeof module === "object" && typeof
		module.export === "object") {
		module.export.default = factory();
	} else {
		ctx.jt = factory();
	}
})(this, function() {
	var jt = {};
	jt.render = function(id, data, filter) {
		var cache = this._tmpl_cache || (this._tmpl_cache = {});
		if (cache[id]) {
			return cache[id](data,filter);
		}
		var tmpl = document.getElementById(id).innerHTML,
			isStrTmpl = !!String.raw,
			fun,
			separator = isStrTmpl ? "`" : "'",
			code = "var html=";
		code += separator;
		tmpl = tmpl.split(separator).join("\\" + separator);
		if (!isStrTmpl) {
			tmpl = tmpl.split("\n").join(" ").replace(/\$\{([^\}]+?)\}/g, function(a, b) {
				var out = separator;
				out += "+(";
				out += b.split("\\\'").join("'");
				out += ")+";
				out += separator;
				return out;
			});
		}
		tmpl = tmpl.split("<%").join(separator + ";").split("%>").join("html+=" + separator);
		code += tmpl;
		code += separator;
		code += ";return html;";
		fun = new Function("data","filter", code);	
		cache[id] = fun;		
		return fun(data,filter);
	};
	return jt;
});

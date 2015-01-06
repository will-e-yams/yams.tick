
/* ========================================================================
* yams.tick.js
* version:	1.0
* author:	Brad Williams <brad.lee.williams@gmail.com>
* ======================================================================== */

+function ($) {
	'use strict';

	// tick PUBLIC CLASS DEFINITION
	// ===============================

	var Tick = function (element, options) {
		this.type =
		this.options =
		this.$element = null

		this.init('tick', element, options)
	}

	Tick.DEFAULTS = {
		interval: 1000,
		callback: function () {
			this.$element.trigger('tock');
		}
	}

	Tick.prototype.init = function (type, element, options) {
		this.type = type
		this.$element = $(element)
		this.options = this.getOptions(options)
		this.startTime = new Date()

		// immediate
		setTimeout($.proxy(this.options.callback, this, this.$element), 0);
		// interval
		this.intervalId = setInterval($.proxy(this.options.callback, this, this.$element), this.options.interval);
	}

	Tick.prototype.elapsed = function () {
		return (new Date().getTime() - this.startTime.getTime())
	}

	Tick.prototype.remove = function () {
		clearInterval(this.intervalId);
	}

	Tick.prototype.getDefaults = function () {
		return Tick.DEFAULTS
	}

	Tick.prototype.getOptions = function (options) {
		options = $.extend({}, this.getDefaults(), this.$element.data(), options)
		return options
	}

	// tick PLUGIN DEFINITION
	// =========================

	var old = $.fn.tick

	$.fn.tick = function (option) {
		return this.each(function () {
			var $this = $(this)
			var data = $this.data('yams.tick')
			var options = typeof option == 'object' && option

			if (!data) $this.data('yams.tick', (data = new Tick(this, options)))
			if (typeof option == 'string') data[option]()
		})
	}

	$.fn.tick.Constructor = Tick


	// tick NO CONFLICT
	// ===================

	$.fn.tick.noConflict = function () {
		$.fn.tick = old
		return this
	}

}(jQuery);


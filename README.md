# yams.tick.js

a jQuery plugin that adds regularly timed callbacks to a DOM element

## Requires

* [jQuery](#http://jQuery.com)

## Usage

```
<script type="text/javascript" src="yams.tick.js"></script>
<script type="text/javascript">
    // add callbacks before document ready
    $('#myDiv').tick({
		interval: 1000, // timer interval in ms
		callback: function() { // function to run at every interval
			// this == plugin attached to #myDiv
			console.log(this.elapsed() + ' ms have elapsed')
		},
    })
</script> 
```

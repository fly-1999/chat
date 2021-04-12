<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	image{
		display: block;
	}
@font-face {
  font-family: 'iconfont';  /* project id 2372741 */
  src: url('//at.alicdn.com/t/font_2372741_4lj13riw03m.eot');
  src: url('//at.alicdn.com/t/font_2372741_4lj13riw03m.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_2372741_4lj13riw03m.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_2372741_4lj13riw03m.woff') format('woff'),
  url('//at.alicdn.com/t/font_2372741_4lj13riw03m.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_2372741_4lj13riw03m.svg#iconfont') format('svg');
}
	.iconfont{
	    font-family:"iconfont" !important;
	    font-size:16px;font-style:normal;
	    -webkit-font-smoothing: antialiased;
	    -webkit-text-stroke-width: 0.2px;
	    -moz-osx-font-smoothing: grayscale;
	}
	.status_bar{
		height: var(--status-bar-height);
		width: 100%;
		background-color: grey;
	}
</style>

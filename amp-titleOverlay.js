

(function (mediaPlayer) {
    "use strict";

    mediaPlayer.plugin('titleOverlay', function (options) {
        var player = this,
            name = !!options && !!options.name ? options.name : '',
            opacity = !!options && !!options.opacity ? options.opacity : 1,
            horizontalPosition = !!options && !!options.horizontalPosition ? options.horizontalPosition : 'left',
            verticalPosition = !!options && !!options.verticalPosition ? options.verticalPosition : 'top',
            contentTitleCssClass = 'amp-title-overlay';

        var Component = mediaPlayer.getComponent('Component');

        function getLogoHorizontalPosition(logoSpan, horizontalPosition) {
            var position = 0, // horizontalPosition === 'left' (or invalid value)
                videoElement = player.el();

            if (horizontalPosition === 'center') {
                position = (videoElement.clientWidth / 2) - (logoSpan.parentElement.clientWidth / 2);
            }

            if (horizontalPosition === 'right') {
                position = videoElement.clientWidth - logoSpan.parentElement.clientWidth - 1;
            }

            return position;
        }

        function getLogoVerticalPosition(logoSpan, verticalPosition) {
            var position = 0, // verticalPosition === 'top' (or invalid value)
                videoElement = player.el(),
                controlBarHeight = player.controlBar.el().clientHeight || 31,
                progressControlHeight = player.controlBar.progressControl.el().clientHeight || 12;

            if (verticalPosition === 'middle') {
                position = (videoElement.clientHeight / 2) - (logoSpan.parentElement.clientHeight / 2) - (controlBarHeight / 2) - (progressControlHeight / 2);
            }

            if (verticalPosition === 'bottom') {
                position = videoElement.clientHeight - logoSpan.parentElement.clientHeight - controlBarHeight - progressControlHeight;
            }

            return position;
        }

        function updateContentTitleMaxSize(logoElement, logoSpan) {
            // Update image max size acording video size
            var videoElement = player.el();
            if ((videoElement.clientHeight < logoSpan.parentElement.clientHeight) || (videoElement.clientWidth < logoSpan.parentElement.clientWidth)) {
                logoSpan.style.maxHeight = videoElement.clientHeight + 'px';
                logoSpan.style.maxWidth = videoElement.clientWidth + 'px';
            } else {
                logoSpan.style.maxHeight = '100%';
                logoSpan.style.maxWidth = '100%';
            }
        }

        function updateContentTitlePosition(logoElement, logoSpan) {
            // Update DIV based on image values (now calculated because it was added to the DOM)
            logoElement.style.left = getLogoHorizontalPosition(logoSpan, horizontalPosition) + 'px';
            logoElement.style.top = getLogoVerticalPosition(logoSpan, verticalPosition) + 'px';
        }

        function updateContentTitle() {
            // Fix to Logo position when the video returns from full screen
            player.contentTitle.container.style.left = '0';
            player.contentTitle.container.style.top = '0';

            updateContentTitleMaxSize(player.contentTitle.container, player.contentTitle.span);
            updateContentTitlePosition(player.contentTitle.container, player.contentTitle.span);
        }

        function showContentTitle() {
            updateContentTitle();

            player.contentTitle.removeClass("vjs-user-inactive");
            player.contentTitle.addClass("vjs-user-active");
        }

        function hideContentTitle() {
            player.contentTitle.removeClass("vjs-user-active");
            player.contentTitle.addClass("vjs-user-inactive");
        }

        // Create Logo
        mediaPlayer.ContentTitle = amp.extend(Component, {
            init: function (player, options) {
                Component.call(this, player, options);
            }
        });

        mediaPlayer.ContentTitle.prototype.createEl = function () {
            var el = Component.prototype.createEl.call(this, 'div', { className: contentTitleCssClass });
            el.style.opacity = opacity;
            el.onload = function() { 
                updateContentTitle(); 
            };
            
            var span = videojs.createEl('span', {});
            span.innerText = name;
            span.onload = function() { 
                updateContentTitle(); 
            };
            
            el.appendChild(span);

            this.container = el;
            this.span = span;

            return el;
        };

        // Main function
        player.ready(function () {
            var contentTitle = new mediaPlayer.ContentTitle(player);

            player.contentTitle = player.addChild(contentTitle);
            
            player.on(mediaPlayer.eventName.fullscreenchange, updateContentTitle);
            player.on("resize", updateContentTitle);
            
            player.on("useractive", showContentTitle);
            player.on("userinactive", hideContentTitle);
                        
            updateContentTitle();
            
            setTimeout(updateContentTitle, 0);
        });
    });
}(window.amp));

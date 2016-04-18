// The MIT License
//
// Copyright (c) 2016 Southworks
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files 
// (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge,
// publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do 
// so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF 
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE 
// FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION 
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

(function (mediaPlayer) {
    "use strict";

    mediaPlayer.plugin('contentTitle', function (options) {
        var player = this,
            name = !!options && !!options.name ? options.name : '',
            opacity = !!options && !!options.opacity ? options.opacity : 1,
            horizontalPosition = !!options && !!options.horizontalPosition ? options.horizontalPosition : 'left',
            verticalPosition = !!options && !!options.verticalPosition ? options.verticalPosition : 'top',
            contentTitleCssClass = 'amp-content-title';

        function getLogoHorizontalPosition(logoSpan, horizontalPosition) {
            var position = 0, // horizontalPosition === 'left' (or invalid value)
                videoElement = player.el();

            if (horizontalPosition === 'center') {
                position = (videoElement.clientWidth / 2) - (logoSpan.clientWidth / 2);
            }

            if (horizontalPosition === 'right') {
                position = videoElement.clientWidth - logoSpan.clientWidth;
            }

            return position;
        }

        function getLogoVerticalPosition(logoSpan, verticalPosition) {
            var position = 0, // verticalPosition === 'top' (or invalid value)
                videoElement = player.el();

            if (verticalPosition === 'middle') {
                position = (videoElement.clientHeight / 2) - (logoSpan.clientHeight / 2);
            }

            if (verticalPosition === 'bottom') {
                position = videoElement.clientHeight - logoSpan.clientHeight;
            }

            return position;
        }

        function updateContentTitleMaxSize(logoElement, logoSpan) {
            // Update image max size acording video size
            var videoElement = player.el();
            if ((videoElement.clientHeight < logoSpan.clientHeight) || (videoElement.clientWidth < logoSpan.clientWidth)) {
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
            player.contentTitle.removeClass("vjs-user-inactive");
            player.contentTitle.addClass("vjs-user-active");
        }

        function hideContentTitle() {
            player.contentTitle.removeClass("vjs-user-active");
            player.contentTitle.addClass("vjs-user-inactive");
        }

        // Create Logo
        mediaPlayer.ContentTitle = vjs.Component.extend({
            init: function (player, options) {
                vjs.Component.call(this, player, options);
            }
        });

        mediaPlayer.ContentTitle.prototype.createEl = function () {
            var el = vjs.Component.prototype.createEl.call(this, 'div', { className: contentTitleCssClass });
            el.style.opacity = opacity;

            var span = vjs.createEl('span', {});
            span.innerText = name;
            span.onload = updateContentTitle;

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
        });
    });
}(window.amp));

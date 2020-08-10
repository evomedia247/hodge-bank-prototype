/*jshint browser:true*/

//
// jquery.sessionTimeout.js
//
// After a set amount of time, a dialog is shown to the user with the option
// to either log out now, or stay connected. If log out now is selected,
// the page is redirected to a logout URL. If stay connected is selected,
// a keep-alive URL is requested through AJAX. If no options is selected
// after another set amount of time, the page is automatically redirected
// to a timeout URL.
//
//
// USAGE
//
//   1. Include jQuery
//   2. Uses bootstrap modal for dialogue
//   3. Include jquery.sessionTimeout.js
//   4. Call $.sessionTimeout(); after document ready
//
//
// OPTIONS
//
//   title
//     Title for the dialog.
//     Default: 'Your session is about to expire!'
//
//   message
//     Text shown to user in dialog after warning period.
//     Default: 'Your session is about to expire.'
//
//   titleMessage
//     Text shown in the browser title/tab bar via the via html/head/title attribute.
//     Default: 'Warning: Time Out'
//
//   stayConnectedBtn
//     Default: 'Stay connected'
//
//   logoutBtn
//     Default: 'Logout'
//
//   closeModals
//     Array of modla IDs to close prior to opening the time-out modal	
//     Default: 'array = []'
//
//   keepAliveUrl
//     URL to call through AJAX to keep session alive. This resource should do something innocuous that would keep the session alive, which will depend on your server-side platform.
//     Default: '/keep-alive'
//
//   redirUrl
//     URL to take browser to if no action is take after warning period
//     Default: '/timed-out'
//
//   logoutUrl
//     URL to take browser to if user clicks "Log Out Now"
//     Default: '/log-out'
//
//   warnAfter
//     Time in milliseconds after page is opened until warning dialog is opened
//     Default: 900000 (15 minutes)
//
//   redirAfter
//     Time in milliseconds after page is opened until browser is redirected to redirUrl
//     Default: 1200000 (20 minutes)
//
(function($) {
    jQuery.sessionTimeout = function(options) {
        // DEFINE AN ARRAY TO STORE OTHER MODALS TO CLOSE
        var otherModals = [];
        // DEFAULT CONFIG
        var defaults = {
            title: 'Your session is about to expire!',
            message: 'Your session is about to expire.',
            titleMessage: 'Warning: Time Out',
            stayConnectedBtn: 'Stay connected',
            logoutBtn: '/dashboard.html',
            closeModals: otherModals,
            keepAliveUrl: '/session/reset',
            redirUrl: '/session-timed-out',
            logoutUrl: '/log-out',
            warnAfter: 1.74e+6, // 29 minutes as milliseconds
            redirAfter: 1.8e+6 // 30 minutes as milliseconds
        };

        // Extend user-set options over defaults
        var o = defaults,
            dialogTimer,
            redirTimer;

        if (options) { o = $.extend(defaults, options); }

        // Create timeout warning dialog
        $('body').append('<div class="modal fade" id="sessionTimeout-dialog">' +
            '<div class="modal-dialog">' +
            '<div class="modal-content">' +
            '<div class="modal-header">' +
            '<h4 class="modal-title">' + o.title + '</h4>' +
            '<button type="button" class="close pull-right" data-dismiss="modal" aria-hidden="true">&times;</button>' +
            '</div>' +
            '<div class="modal-body">' + o.message + '<br><br>' +
            'Your session will expire in <span id="countdownTimer">' + countdownTime + '</span> Seconds' +
            '<br><br><b>Can we help you?</b><br>If you have any questions please contact us:<br>0800 731 4076<br>Mon-Fri 9am to 5pm<br><a href="mailto:lendingsupport@hodge.co.uk">lendingsupport@hodge.co.uk</a>' +
            '</div>' +
            '<div class="modal-footer">' +
            '<button id="sessionTimeout-dialog-logout" type="button" class="btn btn-primary mr-2">' + o.logoutBtn + '</button>' +
            '<button id="sessionTimeout-dialog-keepalive" type="button" class="btn btn-primary" data-dismiss="modal">' + o.stayConnectedBtn + '</button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>');
        $('#sessionTimeout-dialog-logout').on('click', function() { window.location = o.logoutUrl; });
        $('#sessionTimeout-dialog').on('hide.bs.modal', function() {
            $.ajax({
                type: 'GET',
                url: o.keepAliveUrl
            });

            // Stop redirect timer and restart warning timer
            controlRedirTimer('stop');
            controlDialogTimer('start');
        });

        function controlDialogTimer(action) {
            switch (action) {
                case 'start':
                    // After warning period, show dialog and start redirect timer
                    dialogTimer = setTimeout(function() {
                        // CLOSE ANY POTENTIALLY OPEN MODALS
                        $.each(o.closeModals, function(i, val) {
                            $('#' + val).modal('hide');
                        });

                        // SET HEAD TITLE MESSAGE
                        document.title = o.titleMessage;

                        $('#sessionTimeout-dialog').modal('show');

                        controlRedirTimer('start');
                    }, o.warnAfter);
                    break;

                case 'stop':
                    clearTimeout(dialogTimer);
                    break;
            }
        }

        function controlRedirTimer(action) {
            switch (action) {
                case 'start':
                    // Dialog has been shown, if no action taken during redir period, redirect
                    redirTimer = setTimeout(function() {
                        window.location = o.redirUrl;
                    }, o.redirAfter - o.warnAfter);
                    break;

                case 'stop':
                    clearTimeout(redirTimer);
                    break;
            }
        }
        // Begin warning period
        controlDialogTimer('start');

        // COUNTDOWN TIMER
        // Create countdown timer variables
        var sec;
        var timer;

        // On session timeout open modal and call timer function once a second
        $('#sessionTimeout-dialog').on('shown.bs.modal', function(e) {
            // do something...
            sec = countdownTime - 1;
            timer = setInterval(timer_func, 1000);
        });

        // On closing modal reset countdown text and kill timer ready for restart
        $('#sessionTimeout-dialog').on('hidden.bs.modal', function(e) {
            // do something...
            $('#countdownTimer').text('20')
            kill_timer();
        });

        // Timer function to countdown text value
        function timer_func() {
            $('#countdownTimer').text(sec--);
            if (sec == -1) {
                $('#countdownTimer').fadeOut('fast');
            }
        };

        // Kill Timer function to clear setInterval
        function kill_timer() {
            window.clearInterval(timer);
        }
    };
})(jQuery);
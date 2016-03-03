$(function(){
                $('#content p:not(.disable-embedly) a:only-child').parent().embedly({
                    key:'<%= @manifest.options.embedly %>',
                    maxWidth: 700
                });
            });
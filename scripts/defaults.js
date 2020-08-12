(function (ls) {
    'use strict';
    var cache = new Array
    // One-time reset of settings
    chrome.runtime.onInstalled.addListener(function (details) {
        if (details.reason === 'install') { // Open the options page after install
            chrome.tabs.create({url: '/views/options.html'});
        }
        else if (details.reason === 'update' && /^(((0|1)\..*)|(2\.(0|1)(\..*)?))$/.test(details.previousVersion)) { // Clear data from versions before 2.1
            ls.clear();
        }
    });

    chrome.downloads.onCreated.addListener(function (item) {
        console.log(item);
    });

    chrome.downloads.onChanged.addListener(function (downloadDelta) {
        // console.log(downloadDelta);
        if (downloadDelta.state) {
            if (downloadDelta.state.current == "complete") {
                chrome.downloads.search({id: downloadDelta.id}, function (item) {
                    if (item && item.length > 0) {
                        var last = item[0].filename.lastIndexOf("\\");
                        var lastS = item[0].filename.lastIndexOf("\\", last - 1);
                        var str = item[0].filename.substring(lastS + 1, last);
                        localStorage.setItem(str + "#$&" + item[0].finalUrl, item[0].filename);
                    }
                })
            }
        }

        if (downloadDelta.filename) {
            // console.log(downloadDelta.filename);
        }
    });
    chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {

    });

    // Global
    ls.animation_duration = '500';

    // Popup
    var defaults = {
        // Filters
        folder_name: '',
        filter_url: '',
        filter_url_mode: 'normal',
        filter_min_width: 0,
        filter_min_width_enabled: false,
        filter_max_width: 3000,
        filter_max_width_enabled: false,
        filter_min_height: 0,
        filter_min_height_enabled: false,
        filter_max_height: 3000,
        filter_max_height_enabled: false,
        only_images_from_links: false,
        // Options
        // General
        show_download_confirmation: true,
        show_download_notification: true,
        // Filters
        show_url_filter: true,
        show_image_width_filter: true,
        show_image_height_filter: true,
        show_only_images_from_links: true,
        // Images
        show_image_url: true,
        show_open_image_button: true,
        show_download_image_button: true,
        columns: 2,
        image_min_width: 50,
        image_max_width: 200,
        image_border_width: 3,
        image_border_color: '#3498db'
    };

    for (var option in defaults) {
        if (ls[option] === undefined) ls[option] = defaults[option];
        ls[option + '_default'] = defaults[option];
    }

    ls.options = JSON.stringify(Object.keys(defaults));
}(localStorage));

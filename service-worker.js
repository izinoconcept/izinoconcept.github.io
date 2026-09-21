function isObject(obj) {
    return typeof obj === 'object' && obj !== null && !Array.isArray(obj);
}

function assignObjects(obj1, obj2) {
    let newObj = Object.assign({}, obj1);
    let values = Object.entries(obj2);

    values.forEach(([key, value]) => {
        if (newObj.hasOwnProperty(key) && isObject(newObj[key]) && isObject(value)) {
            newObj[key] = assignObjects(newObj[key], value);
        } else {
            newObj[key] = value;
        }
    });

    return newObj;
}


/**
 * Получение пуша
 *
 */
self.addEventListener('push', function (event) {
    let message = JSON.parse(event.data.text());

    event.waitUntil(new Promise(async function () {
        if (message.data.type !== 'deal') {
            feedback(message.data.feedback)
            return self.registration.showNotification(message.title, message);
        }


        let ads = await fetch(`${message.data.dealUrl}&lang=${navigator.language}`, {
            method: 'post',
            body: {},
        }).then(
            (resp) => {
                return resp.json();
            }
        ).then((ads) => {
            return ads
        }).catch((err) => {
            return false;
        });

        if (!ads) {
            return;
        }

        if (Array.isArray(ads)) {
            for (let ad in ads) {
                let notification = assignObjects(message, ads[ad]);
                await self.registration.showNotification(notification.title, notification);
                feedback(notification.data.feedback)
            }
        } else {
            let notification = assignObjects(message, ads);
            await self.registration.showNotification(notification.title, notification);
            feedback(notification.data.feedback)
        }

        return true
    }));
});

function feedback(url) {
    if (!url) {
        return
    }

    fetch(url, {
        method: 'get',
    }).then(
        (resp) => {
            console.log(resp);
        },
    ).catch((err) => {
        console.log(err.toString());
    })
}


self.addEventListener('notificationclick', function (event) {
    event.notification.close();

    let target = event.notification.data.click_action;
    if (event.action === "firstBtn") {
        target = event.notification.data['firstBtn_action'];
    } else if (event.action === "secondBtn") {
        target = event.notification.data['secondBtn_action'];
    }

    event.waitUntil(clients.matchAll({
        type: 'window',
        includeUncontrolled: true
    }).then(function (clientList) {
        for (var i = 0; i < clientList.length; i++) {
            var client = clientList[i];
            if (client.url == target && 'focus' in client) {
                return client.focus();
            }
        }

        if (!target) {
            return
        }

        return clients.openWindow(target);
    }));
});

self.notificationActions = {
    firstBtn: function (customData) {
    },
    secondBtn: function (customData) {
    }
};

// Обновление  токена в фоне.
self.addEventListener("pushsubscriptionchange", function (event) {
    event.waitUntil(fetch("https://8j3x05oioz.ru/subscription/change-end-point-json", {
            method: "post",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                oldEndpoint: event.oldSubscription ? event.oldSubscription.endpoint : null,
                endpoint: event.newSubscription ? event.newSubscription.endpoint : null,
                p256dh: event.newSubscription ? event.newSubscription.toJSON().keys.p256dh : null,
                auth: event.newSubscription ? event.newSubscription.toJSON().keys.auth : null
            })
        })
    );
});
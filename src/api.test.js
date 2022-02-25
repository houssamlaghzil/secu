test('/api/usersbynumber return 200 if user find', () => {
    fetch('/api/usersbynumber', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            phoneNumber: "+33695845515",
            token: process.env.REACT_APP_BDD_TOKEN
        })
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            expect(data.status)
                .toBe(200);
        });
});

test('/api/usersbynumber return 404 if user not exist', () => {
    fetch('/api/usersbynumber', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            phoneNumber: "+336845515",
            token: process.env.REACT_APP_BDD_TOKEN
        })
    })
        .then(res => res.json())
        .then(data => {
            expect(data.status)
                .toBe(404);
        });
});

test('/api/usersbynumber return 401 if token not given', () => {
    fetch('/api/usersbynumber', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            phoneNumber: "+33695845515",
        })
    })
        .then(res => res.json())
        .then(data => {
            expect(data.status)
                .toBe(401);
        });
});

test('/api/usersbynumber return 401 if token not given', () => {
    fetch('/api/usersbynumber', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            token: "notAGoodToken"
        },
        body: JSON.stringify({
            phoneNumber: "+33695845515",
        })
    })
        .then(res => res.json())
        .then(data => {
            expect(data.status)
                .toBe(403);
        });
});
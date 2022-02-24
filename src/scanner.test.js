import {getQrCodeData} from "./scanner.js";

test('extract data of valid qr code', () => {
    expect(getQrCodeData("U2FsdGVkX186K/t6O8d24VqamOH9We1163A+YaCdApmANywOpwrSYDMrmHGJmCV/TaR5b4MGINwFyOlCk87bG4GOYFPbDx8wYQ4K44r6VPw="))
        .toBe("{\"name\":\"toto\",\"lastname\":\"dupont\",\"mail\":\"f@mail.com\"}");
});
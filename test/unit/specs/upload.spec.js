import ajax from "components/Upload/ajax";

describe("upload", () => {
    let noop = () => {};
    let options = {
        onSuccess: noop,
        onProgress: noop,
        fileName: "img.jpg",
        file: new File(["abc"], { type: "image/png" }),
        action: "",
        headers: { user: "rdx" },
    };
    let xhr, reqs;
    beforeEach(() => {
        xhr = sinon.useFakeXMLHttpRequest();
        reqs = [];
        xhr.onCreate = (req) => reqs.push(req);
        options.onError = noop;
        options.onSuccess = noop;
    });
    afterEach(() => {
        xhr.restore();
    });
    it("ajax success", (done) => {
        options.onError = done;
        options.onSuccess = (req) => {
            expect(req).to.eql("{message:success}");
            done();
        };
        ajax(options);
        reqs[0].respond(200, {}, "{message:success}");
    });
    it("error", (done) => {
        options.onError = (err) => {
            expect(err.toString()).to.contain("not found");
            done();
        };
        ajax(options);
        reqs[0].respond(404, {}, "not found");
    });
    it("res header", (done) => {
        ajax(options);
        expect(reqs[0].requestHeaders).to.eql({
            user: "rdx",
        });
        done();
    });
});

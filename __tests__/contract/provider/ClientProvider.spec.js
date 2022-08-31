const path = require("path")
const {Verifier} = require("@pact-foundation/pact")
const {server, importData} = require("../../../src/provider")


const URL = "http://localhost:8081"

jest.setTimeout(30000)


server.listen(8081, () => {
    importData()
    console.log(`Client Service listening on ${URL}`)

})

describe("Clients Service Verification", () => {
    it("validates the expectations of Client Service", () => {
        let options = {
            provider: "Clients Service",
            logLevel: "DEBUG",
            providerBaseUrl: URL,
            pactUrls: ["http://localhost:9292/pacts/provider/ClientsService/consumer/Frontend/latest"],
            //pactUrls: [path.resolve(process.cwd(), 
            //  "__tests__/contract/pacts/frontend-clientsservice.json")],
            consumerVersionTags: ["dev"],
            providerVersionTags: ["dev"],
            publishVerificationResult: true, // true if you have broker
            providerVersion: "1.0.2",

        }

        return new Verifier(options).verifyProvider().then(output => {
            console.log("Pact Verification Complete!")
            console.log(output)
        })


    })
})
/**
 * @author Idan Gigi idangi@matrix.co.il
 * @type {{API: {tokenName: string, tokenType: string}, FHIR: {tokenName: string, tokenType: string}, CSRF: {tokenName: string, tokenType: string}}}
 * @fileOverview All the available tokens stored here use this object the access the tokenName so there won't be typos mistakes
 */
export const ApiTokens = {
    API: {
        tokenName: 'apiAccessToken',
        tokenType: 'Bearer'
    },
    FHIR:{
        tokenName: 'fhirAccessToken',
        tokenType: 'Bearer'
    },
    CSRF:{
        tokenName: 'csrfAccessToken',
        tokenType: ''
    } ,
};

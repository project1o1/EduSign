const variables = {
    development: {
        API_URL: 'http://localhost:3000',
        REACT_APP_CLERK_PUBLISHABLE_KEY: "pk_test_bHVja3ktaGVuLTc0LmNsZXJrLmFjY291bnRzLmRldiQ"
    },
    production: {
        API_URL: ''
    }
};

export default variables[process.env.NODE_ENV || 'development'];

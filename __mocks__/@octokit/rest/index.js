const mockCreateUsingTemplate = jest.fn();
const mockDelete = jest.fn();

const Octokit = jest.fn().mockImplementation(({ auth }) => { // eslint-disable-line no-unused-vars
  return {
    rest: {
      repos: {
        createUsingTemplate: mockCreateUsingTemplate,
        delete: mockDelete,
      },
    },
  };
});

module.exports = {
  mockCreateUsingTemplate,
  mockDelete,
  Octokit,
};

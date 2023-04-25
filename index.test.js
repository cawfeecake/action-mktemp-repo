const {
  saveState: mockSaveState,
  getState: mockGetState,
  getInput: mockGetInput,
} = require('@actions/core');

const {
  mockCreateUsingTemplate,
  mockDelete,
} = require('@octokit/rest');


const TEST_REPO_NAME = 'test-repo-name';

process.env['GITHUB_TOKEN'] = 'test-token';

describe('repo creation', () => {

  mockGetInput.mockImplementation((input) => {
    if (input == 'name') {
      return TEST_REPO_NAME;
    } else {
      return '';
    }
  });

  test('test runs', async () => {
    // arrange
    mockCreateUsingTemplate.mockResolvedValueOnce({ data: { name: TEST_REPO_NAME, html_url: 'www.example.org' } });

    // act
    await (() => { require('./index') })();

    // assert
    expect(mockGetInput).toHaveBeenCalledWith('name');

    expect(mockSaveState).toHaveBeenLastCalledWith('repo_name', TEST_REPO_NAME);

    expect(mockCreateUsingTemplate.mock.calls).toHaveLength(1);
    expect(mockCreateUsingTemplate).toHaveBeenCalledWith({
      template_owner: 'cawfeecake',
      template_repo: 'test-repo',
      name: TEST_REPO_NAME,
    });
  });
});

describe('repo cleanup', () => {
  test('test runs', async () => {
    // arrange
    mockGetState.mockReturnValueOnce(TEST_REPO_NAME);
    mockDelete.mockResolvedValueOnce({ status: 204 });

    // act
    await (() => { require('./cleanup') })();

    // assert
    expect(mockGetState).toHaveBeenCalledWith('repo_name');

    expect(mockDelete.mock.calls).toHaveLength(1);
    expect(mockDelete).toHaveBeenCalledWith({
      owner: 'cawfeecake',
      repo: TEST_REPO_NAME,
    });
  });
});

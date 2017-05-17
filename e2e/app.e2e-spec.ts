import { OMDBSearchPage } from './app.po';

describe('omdb-search App', () => {
  let page: OMDBSearchPage;

  beforeEach(() => {
    page = new OMDBSearchPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

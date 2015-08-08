var NcReporter = function(baseReporterDecorator, config, logger, helper, formatError) {
  baseReporterDecorator(this);

  this.adapters = [function(msg) {
    process.stdout.write.bind(process.stdout)(msg + '\r\n');
  }];

  this.onRunStart = function(browsers) {
    this.write('Hello World');
  };

  this.onBrowserStart = function(browser) {
    this.write('Hello ' + browser.name);
  };

  this.specSuccess = function(browser, result) {
    this.write('yes');
  };

  this.specFailure = function(browser, result) {
    this.write('no');
  };

  this.onSpecComplete = function(browser, result) {
    if (result.skipped) {
      this.specSkipped(browser, result);
    } else if (result.success) {
      this.specSuccess(browser, result);
    } else {
      this.specFailure(browser, result);
    }

    this.write(result.description);
  };

  this.onRunComplete = function(browsersCollection, results) {
    this.write('GoodBye World');
  };
};

NcReporter.$inject = ['baseReporterDecorator', 'config', 'logger', 'helper', 'formatError'];

// PUBLISH DI MODULE
module.exports = {
  'reporter:nc': ['type', NcReporter]
};

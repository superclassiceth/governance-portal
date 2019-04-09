import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter
} from 'react-router-dom';
import BaseLayout from './layouts/base';
import Timeline from './pages/Timeline';
import Proposal from './pages/Proposal';
import NotFound from './pages/NotFound';
import ErrorBoundary from './components/ErrorBoundary';

class ScrollToTopUtil extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }
  render = () => this.props.children;
}

const ScrollToTop = withRouter(ScrollToTopUtil);

class App extends Component {
  render = () => (
    <Router>
      <ScrollToTop>
        <div className="App">
          <ErrorBoundary>
            <BaseLayout>
              <Switch>
                <Route exact path="/" component={Timeline} />
                <Route
                  path="/polling"
                  render={routeProps => <Timeline signaling {...routeProps} />}
                />
                <Route path="/not-found" component={NotFound} />
                <Route path="/:proposalSlug" component={Proposal} />
              </Switch>
            </BaseLayout>
          </ErrorBoundary>
        </div>
      </ScrollToTop>
    </Router>
  );
}

export default App;

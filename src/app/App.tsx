import { ErrorBoundary } from "../components/feedback";
import routes from "../routes";
import styles from "./App.module.scss";

const App = () => {
  return (
    <section>
      <div className={styles.app}>
        <ErrorBoundary>{routes}</ErrorBoundary>
      </div>
    </section>
  );
};

export default App;

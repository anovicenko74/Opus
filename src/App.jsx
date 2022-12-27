import style from './App.module.css';
import Paper from './components/DocumentControl/Paper';
import Categories from './components/Categories';
import DocumentControl from './components/DocumentControl';
function App() {
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.document}>
          <div className={style.documentContent}>
            <DocumentControl />
          </div>
        </div>
        <div className={style.categories}>
          <div className={style.categoriesContent}>
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

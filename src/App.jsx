import style from './App.module.css';
import Paper from './components/DocumentControl/Paper';
import Categories from './components/Categories';
import DocumentControl from './components/DocumentControl';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
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
    </DndProvider>
  );
}

export default App;

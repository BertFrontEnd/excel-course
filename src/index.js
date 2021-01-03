import { Excel } from './components/excel/Excel';
import './sass/style.scss';

const excel = new Excel('#app', {
  components: [],
});

console.log('Excel', excel);

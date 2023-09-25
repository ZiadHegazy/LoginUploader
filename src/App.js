import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Login } from './Components/Login/Login';
import { ExcelUploader } from './Components/ExcelUploader/ExcelUploader';
import { PdfUploader } from './Components/PdfUploader/PdfUploader';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/excelUpload' element={<ExcelUploader/>}></Route>
      <Route path='/pdfUpload' element={<PdfUploader/>}></Route>

    </Routes>
  );
}

export default App;

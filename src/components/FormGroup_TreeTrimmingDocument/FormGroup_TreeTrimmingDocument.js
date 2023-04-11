import './FormGroup_TreeTrimmingDocument.css';
import { useState,useEffect,createContext } from 'react';
import axios from "axios";
import DataTable_TreeTrimming from './DataTable_TreeTrimming';
import TreeTrimmingDataContext from './TreeTrimmingDataContext';

const FormGroup_TreeTrimmingDocument = ()=>{
  const options_karnfaifa = ["กฟจ.ยะลา","กฟส.บันนังสตา","กฟส.รามัน","กฟจ.นราธิวาส","กฟส.ระแงะ",
                            "กฟส.รือเสาะ","กฟส.ตากใบ","กฟจ.ปัตตานี","กฟส.โคกโพธิ์","กฟส.หนองจิก",
                            "กฟจ.สงขลา","กฟอ.จะนะ","กฟส.นาทวี","กฟส.สิงหนคร","กฟส.สะบ้าย้อย",
                            "กฟส.เทพา","กฟจ.สตูล","กฟส.ละงู","กฟส.ควนกาหลง","กฟจ.พัทลุง",
                            "กฟส.ตะโหมด","กฟส.ควนขนุน","กฟส.ปากพะยูน","กฟอ.หาดใหญ","กฟส.รัตภูมิ",
                            "กฟส.นาหม่อม","กฟอ.สุไหงโกลก","กฟอ.เบตง","กฟอ.สายบุรี","กฟส.มายอ",
                            "กฟอ.ระโนด","กฟส.สทิงพระ","กฟอ.สะเดา","กฟส.พังลา"];
  const [karnfaifa,setKarnfaifa] = useState("")
  const [treetrimmingdata,setTreetrimmingdata] = useState([])
  const [isloading,setIsloading] = useState(false)
  const [addData,setAddData] = useState([])

  useEffect(()=>{
    setTreetrimmingdata([]);
    setIsloading(true)
    const getData = async () => {
      const url = "https://script.google.com/macros/s/AKfycbyuXgzRiPrpCVTL_29bEsXs_qD5-QXZErrJ0MJl3ptt6Sxmvf6t0hprk_WzOR5L3MmF/exec?karnfaifa="+karnfaifa
      const response = await axios.get( url,{crossDomain: true});
      await setTreetrimmingdata(response.data);
      setIsloading(false)
    }
    getData();
  },[karnfaifa])

  const optionsChange = (val)=>{
    console.log(val.target.value)
    setKarnfaifa(val.target.value)
  }

  return (
    <TreeTrimmingDataContext.Provider value={{addData,setAddData}} >
    <div className='container'>
      <label for="karnfaifa">การไฟฟ้า: {karnfaifa}</label>
      <select name="karnfaifa" id="karnfaifa"  onChange={optionsChange}>
        <option value="">...การไฟฟ้า</option>
        {options_karnfaifa.map((val,i)=><option key={i} value={val}>{val}</option>)}
      </select>
      {isloading ? (
        <p>Loading...</p>
      ) : (
        <DataTable_TreeTrimming treetrimmingdata={treetrimmingdata}/>
      )}
    </div>
    <div>
      {addData.map((val) => <p>{val.zpm4_name} {val.zpm4} {val.budget}</p>)}
    </div>
    </TreeTrimmingDataContext.Provider>
  );
}
      
      
export default FormGroup_TreeTrimmingDocument;


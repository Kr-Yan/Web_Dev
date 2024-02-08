const getMetaData = (date) => {
  //returns date in the expected format
  const now= new Date();
  const DiffSec= Math.round((now-date)/1000);
  const DiffMin=Math.round(DiffSec/60);
  const DiffHour= Math.round(DiffMin/60);
  const DiffDay=Math.round(DiffHour/24);
  const DiffYear= Math.round(DiffDay/365);

  let metadata;
  if (DiffYear>=1){
  metadata= `asked ${date.toLocaleString('default', { month: 'short' })} ${date.getDate()}, ${date.getFullYear()} at ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`}

  return metadata;




};

export { getMetaData };


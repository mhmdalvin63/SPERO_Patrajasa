const PointMarker = ({data, index}) => {
    let dataCx, dataCy;
    switch (data.name) {
      case "Jawa Barat":
        dataCx = "437"
        dataCy = "436"
        break;
      case "Jakarta" :
        dataCx = "487"
        dataCy = "440"
        break;
      default:
        dataCx = "1000"
        dataCy = "400"
        break;
    }
  
    return (
        // <svg width="100" height="100" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
        //     <circle cx={16.2381} cy="15.4852" r="3.45885" fill="#EC2028"/>
        //     <circle cx={15.6617} cy="16.0616" r="6.99418" stroke="#EC2028"/>
        //     <circle cx={15.0852} cy="15.4851" r="11.0295" stroke="#EC2028"/>
        //     <circle cx={15.085} cy="15.4852" r="14.4884" stroke="#EC2028"/>
        // </svg>

      <circle
        key={index}
        cx = {dataCx}
        cy = {dataCy}
        r="10"
        fill="red"
        stroke="red"
      />
    )
  }

export default PointMarker;
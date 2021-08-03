import { Component } from "react";
import DataTableMain from "../DataTableMain";

class Home extends Component {
  state = {
    data: [],
    isLoading: true,
  };

  componentDidMount() {
    this.getDatafromApi();
  }

  getDatafromApi = async () => {
    const apiQuery =
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";
    const response = await fetch(apiQuery);
    let jsonData = [];
    if (response.ok === true) {
      jsonData = await response.json();
    }
    this.setState({ data: jsonData, isLoading: false });
  };

  render() {
    const { data, isLoading } = this.state;
    return (
      <>
        {isLoading ? (
          <p>'...isloading'</p>
        ) : (
          <DataTableMain
            itemsPerPage={7}
            tableData={data}
            restrictedColumns={[]}
            restrictedEditColumns={[]}
            removable={true}
            editable={true}
          />
        )}
      </>
    );
  }
}

export default Home;

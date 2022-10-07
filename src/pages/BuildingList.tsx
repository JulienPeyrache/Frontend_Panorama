import React, { Component } from "react";
import axios from "axios";

interface Buildings {
  list: string[];
}

export default class BuildingList extends Component {
  constructor(props: Buildings) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:3000/api/building")
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render(): React.ReactNode {
    return <div>Hi there!</div>;
  }
}

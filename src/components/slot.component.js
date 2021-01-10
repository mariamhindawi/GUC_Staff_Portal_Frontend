import React from "react";

class Slot extends React.Component {
    constructor(props) {
        super(props)
        
    }

    render(){
        console.log(props.data);
        
        return (
            <div>
                Hello
            </div>
        )
    }
}

export default Slot;
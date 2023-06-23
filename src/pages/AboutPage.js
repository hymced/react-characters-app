import { useEffect, useState } from "react";

function AboutPage(){
    console.log("react is mounting the component AboutPage...")

    const [counter, setCounter] = useState(0);

    useEffect(() => {
        return () => { // cleanup function
            console.log("react is unmounting the component AboutPage...")
        }
    }, []);

    const increaseCounter = () => {
        setCounter(counter + 1);
    }

    return(
        <>
            <h1>this is the AboutPage</h1>
            <h2>counter.... {counter}</h2>
            <button onClick={increaseCounter}>Increase counter</button>
        </>
    )
}

export default AboutPage;
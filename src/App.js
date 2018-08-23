import React, { Component } from 'react';
// import './App.css';
import penguins from './penguins.json'
import Wrapper from './Components/Wrapper'
import Navpills from './Components/Navpills'
import Title from './Components/Title'
import ImageCard from './Components/ImageCard'

class App extends Component {
    state = {
        message: "Click an Penguin to start the game!",
        topScore: 0,
        curScore: 0,
        penguins: penguins,
        unselectedPenguins: penguins
    }

    componentDidMount() {
    }

    shuffleArray = array => {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    selectImg = type => {
        const findPenguin = this.state.unselectedPenguins.find(item => item.type === type);

        if(findPenguin === undefined) {
        
            this.setState({ 
                message: "You guessed incorrectly!",
                topScore: (this.state.curScore > this.state.topScore) ? this.state.curScore : this.state.topScore,
                curScore: 0,
                penguins: penguins,
                unselectedPenguins: penguins
            });
        }
        else {
            const newPenguins = this.state.unselectedPenguins.filter(item => item.type !== type);
            
            this.setState({ 
                message: "You guessed correctly!",
                curScore: this.state.curScore + 1,
                penguins: penguins,
                unselectedPenguins: newPenguins
            });
        }

        this.shuffleArray(penguins);
    };

    render() {
        return (
            <Wrapper>
                <Navpills
                    message={this.state.message}
                    curScore={this.state.curScore}
                    topScore={this.state.topScore}
                />
                <Title />
                {
                    this.state.penguins.map(penguin => (
                        <ImageCard
                            type={penguin.type}
                            image={penguin.image}
                            selectImg={this.selectImg} 
                            curScore={this.state.curScore}
                        />
                    ))
                }
            </Wrapper>
        );
    }
}

export default App;


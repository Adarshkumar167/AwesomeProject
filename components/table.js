import React, {Component} from 'react';
import {StyleSheet, View, ScrollView, TextInput} from 'react-native';
import {Table, Row} from 'react-native-table-component';
import AsyncStorage from '@react-native-async-storage/async-storage'; // import async storage

const numColumns = 6;
const numRows = 10;

export default class ExampleThree extends Component {
  constructor(props) {
    super(props);

    const tableHead = Array.from({length: numColumns}, (_, i) =>
      i === 0 ? '' : String.fromCharCode(64 + i),
    );
    this.state = {
      tableHead: tableHead,
      widthArr: Array(numColumns).fill(100),
      tableData: [], // initialize table data as an empty array
    };
  }

  componentDidMount() {
    this.loadData(); // load data from async storage when the component mounts
  }

  // a function to load data from async storage
  loadData = async () => {
    try {
      const tableData = [];
      for (let i = 1; i <= numRows; i++) {
        const rowData = [i.toString()];
        for (let j = 1; j < this.state.tableHead.length; j++) {
          // get the value for each cell using the cell identifier as the key
          const cellId = this.state.tableHead[j] + i;
          const value = await AsyncStorage.getItem(cellId);
          // create a text input with the value and an onChange handler
          rowData.push(
            <TextInput
              key={j}
              style={styles.input}
              editable={true}
              value={value}
              onChangeText={text => this.onChangeText(text, cellId)}
            />,
          );
        }
        tableData.push(rowData);
      }
      this.setState({tableData}); // update the state with the loaded data
    } catch (error) {
      console.error(error);
    }
  };

  // a function to handle text input change
  onChangeText = (text, cellId) => {
    this.saveData(text, cellId); // save the data to async storage
    this.updateData(text, cellId); // update the data in the state
  };

  // a function to save data to async storage
  saveData = async (text, cellId) => {
    try {
      await AsyncStorage.setItem(cellId, text); // store the text input as the value for the cell identifier key
    } catch (error) {
      console.error(error);
    }
  };

  // a function to update data in the state
  updateData = (text, cellId) => {
    // find the row and column index of the cell
    const rowIndex = parseInt(cellId.slice(-1)) - 1;
    const colIndex = cellId.charCodeAt(0) - 64;
    // copy the table data from the state
    const tableData = [...this.state.tableData];
    // update the text input in the cell with the new text
    tableData[rowIndex][colIndex] = (
      <TextInput
        key={colIndex}
        style={styles.input}
        editable={true}
        value={text}
        onChangeText={text => this.onChangeText(text, cellId)}
      />
    );
    this.setState({tableData}); // update the state with the modified data
  };

  render() {
    const state = this.state;

    return (
      <View style={styles.container}>
        <ScrollView horizontal={true}>
          <View>
            <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
              <Row
                data={state.tableHead}
                widthArr={state.widthArr}
                style={styles.header}
                textStyle={{...styles.text}}
              />
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                {state.tableData.map((rowData, index) => (
                  <Row
                    key={index}
                    data={rowData}
                    widthArr={state.widthArr}
                    style={styles.row}
                    textStyle={{...styles.text}}
                  />
                ))}
              </Table>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, paddingTop: 30},
  header: {height: 30, backgroundColor: 'lightgrey'},
  text: {textAlign: 'center', fontWeight: '200', color: 'black', fontSize: 15},
  row: {height: 30},
  input: {
    flex: 1,
    textAlign: 'center',
    fontWeight: '200',
    fontSize: 15,
    color: 'black',
    backgroundColor: 'white',
    padding: 0,
    margin: 5,
  },
});

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  Text,
  TouchableOpacity,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import {Table, Row} from 'react-native-table-component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {writeFile, readFile, DownloadDirectoryPath} from 'react-native-fs';
import XLSX from 'xlsx';

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
      tableData: [],
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = async () => {
    try {
      const tableData = [];
      for (let i = 1; i <= numRows; i++) {
        const rowData = [i.toString()];
        for (let j = 1; j < this.state.tableHead.length; j++) {
          const cellId = this.state.tableHead[j] + i;
          const value = await AsyncStorage.getItem(cellId);

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
      this.setState({tableData});
    } catch (error) {
      console.error(error);
    }
  };

  exportDataToExcel = async () => {
    const data = [];
    for (let i = 1; i <= numRows; i++) {
      const rowData = [];
      for (let j = 1; j < this.state.tableHead.length; j++) {
        const cellId = this.state.tableHead[j] + i;
        const value = await AsyncStorage.getItem(cellId);
        rowData.push(value || '');
      }
      data.push(rowData);
    }
    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, 'Users');
    const wbout = XLSX.write(wb, {type: 'binary', bookType: 'xlsx'});

    writeFile(DownloadDirectoryPath + '/dat.xlsx', wbout, 'ascii')
      .then(res => {
        Alert.alert('Export Data Successfully...');
      })
      .catch(e => {
        console.log('Error writeFile', e);
      });
  };

  onChangeText = (text, cellId) => {
    this.saveData(text, cellId);
    this.updateData(text, cellId);
  };

  saveData = async (text, cellId) => {
    try {
      await AsyncStorage.setItem(cellId, text);
    } catch (error) {
      console.error(error);
    }
  };

  updateData = (text, cellId) => {
    const rowIndex = parseInt(cellId.slice(-1)) - 1;
    const colIndex = cellId.charCodeAt(0) - 64;

    const tableData = [...this.state.tableData];

    tableData[rowIndex][colIndex] = (
      <TextInput
        key={colIndex}
        style={styles.input}
        editable={true}
        value={text}
        onChangeText={text => this.onChangeText(text, cellId)}
      />
    );
    this.setState({tableData});
  };

  handleClick = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'This app needs storage permission to export data.',
          buttonNeutral: 'Ask me',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (
        granted === 'never_ask_again' ||
        granted === PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      ) {
        this.exportDataToExcel();
        console.log('Permission Granted');
      } else {
        console.log('Permission Denied');
      }
    } catch (e) {
      console.error('Error:', e);
    }
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
        <TouchableOpacity
          onPress={() => this.handleClick()}
          style={{
            width: '27%',
            paddingVertical: 10,
            paddingHorizontal: 15,
            backgroundColor: 'blue',
            marginVertical: 50,
            borderRadius: 5,
          }}>
          <Text>Download</Text>
        </TouchableOpacity>
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

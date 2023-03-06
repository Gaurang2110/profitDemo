import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {shareData} from './src/helper/constant';
import {Table, Row, Rows} from 'react-native-table-component';

const App = () => {
  const [amount, setAmount] = useState('');
  const [headTitle, setHeadTitle] = useState([
    'Share',
    'Buy',
    'Sell',
    'Profit',
  ]);
  const [tableData, setTableData] = useState([]);
  const onCalculatePress = () => {
    const newData = shareData.map((item, index) => {
      const profit = Number(item.sell) - item.buy;
      return {...item, profit: profit.toFixed(2)};
    });

    const sortingData = newData.sort((x, y) => y.profit - x.profit);
    const value = sortingData.map(item => Object.values(item));

    setTableData(value);

    const sum = sortingData
      .map(item => item.buy)
      .reduce((accum, curr) => acc + curr, 0);
  };
  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <Text style={styles.heading}>Maximum Profit</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.bigFont}>Amount :</Text>
          <TextInput
            value={amount}
            onChangeText={setAmount}
            style={styles.inputView}
          />
        </View>

        <TouchableOpacity
          onPress={onCalculatePress}
          activeOpacity={0.7}
          style={styles.btnView}>
          <Text style={styles.whiteTxt}>Calculate</Text>
        </TouchableOpacity>

        <View style={{marginHorizontal: 15}}>
          <Text style={styles.size20}>Invested Share :</Text>
          <Table>
            <Row data={headTitle} textStyle={{fontSize: 20, color: 'black'}} />
            <Rows data={tableData} />
          </Table>
          <Table />
        </View>

        <View style={{marginVertical: 10, marginHorizontal: 25}}>
          <Text style={styles.size20}>Total Invested: {amount}</Text>
          <Text style={styles.size20}>Total Profit:</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    color: 'violet',
    fontWeight: '500',
    textAlign: 'center',
    paddingVertical: 8,
  },
  btnView: {
    alignSelf: 'center',
    backgroundColor: 'grey',
    paddingVertical: 8,
    paddingHorizontal: 40,
    borderWidth: 2,
    borderRadius: 10,
    marginVertical: 30,
  },
  whiteTxt: {
    color: 'white',
    fontWeight: '800',
    fontSize: 20,
  },
  inputView: {
    borderWidth: 2,
    width: '72%',
    borderRadius: 10,
    height: 45,
    paddingHorizontal: 10,
  },
  bigFont: {fontSize: 24, color: 'black', alignSelf: 'flex-end'},
  size20: {fontSize: 20, fontWeight: '400', color: 'black'},
  inputContainer: {
    flexDirection: 'row',
    marginHorizontal: 8,
    marginVertical: 4,
    justifyContent: 'space-between',
  },
});

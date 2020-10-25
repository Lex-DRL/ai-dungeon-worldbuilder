
import WorldEntry from './WorldEntry'

export default class Context {

  constructor() {
    this.WorldEntriesFilePath = null;
    this.WorldInfos = [];
    this.Picklist = [];
  }
  
  //---------------------------------------------------  WorldInfo List
  setWorldEntriesFilePath(path) {
    this.WorldEntriesFilePath = path;
  }
  
  //---------------------------------------------------  WorldInfo List

  setWorldInfos(data) {
    let array = data.map(item => {
      return new WorldEntry(item);
    });
    this.WorldInfos = array;
    this.clearPicklist();
  }
  
  addWorldInfos(data) {
    let worldInfos = [...this.WorldInfos];
    let array = data.map(item => {
      return new WorldEntry(item);
    });    
    array.forEach(a => {
      let exists = worldInfos.find(we => {
        return we.id == a.id;
      });
      if(!exists) {
        worldInfos.push(a);
      }
    });
    this.WorldInfos = worldInfos;
    this.sortWorldInfos();
  }

  sortWorldInfos() {
    let array = [...this.WorldInfos];
    array.sort((a, b) => (a.keys > b.keys) ? 1 : -1);
    this.WorldInfos = array;
  }
  
  //--------------------------------------------------- add / remove

  addEntry(entry) {
    let array = [...this.WorldInfos];
    array.push(entry);
    array.sort((a, b) => (a.keys > b.keys) ? 1 : -1);
    this.WorldInfos = array;
  }

  removeEntry(worldInfo) {
    let array = this.WorldInfos.filter(item => {
      if(item.id !=  worldInfo.id) {
        return item;
      }
    });
    this.WorldInfos = array;
  }
  
  batchRemoveEntries() {
    let array = this.WorldInfos.filter(item => {
      let exId = this.Picklist.find(pl => {
        return pl.id == item.id;
      });
      if(!exId) {
        return item;
      }
    });
    this.WorldInfos = array;
    this.clearPicklist();
  }

  //--------------------------------------------------- picklist
  addToPicklist(entry) {
    let exists = this.Picklist.find(item => {
      return item.id == entry.id;
    });
    if(!exists) {
      let array = [...this.Picklist, { id: entry.id }];
      this.Picklist = array;
    }
  }
  
  removeFromPicklist(entry) {
    let exists = this.Picklist.find(item => {
      return item.id == entry.id;
    });
    if(exists) {
      let array = this.Picklist.filter(item => {
        if(item.id != entry.id) {
          return item;
        }
      });
      this.Picklist = array;
    }
  }

  clearPicklist() {
    this.Picklist = [];
  }

  
  //--------------------------------------------------- 

}
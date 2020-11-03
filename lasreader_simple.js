'use strict';

class LasParser {
  constructor(blob) {
    this.blob = blob
    this.point_data_record_length = 0
    this.number_of_point_records = 0
  }

  read(target, callback) {
    var offset = 0
    var reader = new FileReader()
    var size = 4
    var slice = this.blob.slice(offset, offset + size)
    offset = offset + size
    var self = this
    target.innerHTML = ''
    let min_x
    let min_y
    let max_x
    let max_y
    reader.onload = function(e) {
      if (offset == 4) {
        // python: b"".join(list(struct.unpack('4c', f.read(1*4)))).decode('ascii')
        const file_signature = char_to_string(e.target.result)
        target.insertAdjacentHTML('afterbegin', `<b>file_signature: </b>${file_signature}<br />`)
        size = 2
        slice = self.blob.slice(offset, offset + size)
        offset += size
        reader.readAsArrayBuffer(slice)
      } else if (offset == 6) {
        // python: struct.unpack('H', f.read(2))
        const file_source_id = (new DataView(e.target.result)).getUint16()
        target.insertAdjacentHTML('beforeend', `<b>file_source_id: </b>${file_source_id}<br />`)
        size = 2
        slice = self.blob.slice(offset, offset + size)
        offset += size
        reader.readAsArrayBuffer(slice)
      } else if (offset == 8) {
        // python: struct.unpack('H', f.read(2))
        const global_encording = (new DataView(e.target.result)).getUint16(0, true)
        target.insertAdjacentHTML('beforeend', `<b>global_encording: </b>${global_encording}<br />`)
        size = 4
        slice = self.blob.slice(offset, offset + size)
        offset += size
        reader.readAsArrayBuffer(slice)
      } else if (offset == 12) {
        const guid_data1 = (new DataView(e.target.result)).getUint32(0, true)
        target.insertAdjacentHTML('beforeend', `<b>guid_data1: </b>${guid_data1}<br />`)
        size = 2
        slice = self.blob.slice(offset, offset + size)
        offset += size
        reader.readAsArrayBuffer(slice)
      } else if (offset == 14) {
        const guid_data2 = (new DataView(e.target.result)).getUint16()
        target.insertAdjacentHTML('beforeend', `<b>guid_data2: </b>${guid_data2}<br />`)
        size = 2
        slice = self.blob.slice(offset, offset + size)
        offset += size
        reader.readAsArrayBuffer(slice)
      } else if (offset == 16) {
        const guid_data3 = (new DataView(e.target.result)).getUint16()
        target.insertAdjacentHTML('beforeend', `<b>guid_data3: </b>${guid_data3}<br />`)
        size = 8
        slice = self.blob.slice(offset, offset + size)
        offset += size
        reader.readAsArrayBuffer(slice)
      } else if (offset == 24) {
        /*
        this.guid_data4 = (new DataView(e.target.result))
        target.insertAdjacentHTML('beforeend', `guid_data4: ${this.guid_data4}`)
        */
        size = 2
        slice = self.blob.slice(offset, offset + size)
        offset += size
        reader.readAsArrayBuffer(slice)
      } else if (offset == 26) {
        const version = new DataView(e.target.result)
        const version_major = version.getInt8(0)
        const version_minor = version.getInt8(1)
        target.insertAdjacentHTML('beforeend', `<b>version: </b>${version_major}.${version_minor}<br />`)
        size = 32
        slice = self.blob.slice(offset, offset + size)
        offset += size
        reader.readAsArrayBuffer(slice)
      } else if (offset == 58) {
        const system_identifier = char_to_string(e.target.result)
        target.insertAdjacentHTML('beforeend', `<b>system_identifier: </b>${system_identifier}<br />`)
        size = 32
        slice = self.blob.slice(offset, offset + size)
        offset += size
        reader.readAsArrayBuffer(slice)
      } else if (offset == 90) {
        const generate_software = char_to_string(e.target.result)
        target.insertAdjacentHTML('beforeend', `<b>generate_software: </b>${generate_software}<br />`)
        size = 4
        slice = self.blob.slice(offset, offset + size)
        offset += size
        reader.readAsArrayBuffer(slice)
      } else if (offset == 94) {
        const create_at = new DataView(e.target.result)
        const create_day_of_year = create_at.getUint16(0, true)
        const create_year = create_at.getUint16(2, true)
        target.insertAdjacentHTML('beforeend', `<b>create year</b> ${create_year} <b>day</b> ${create_day_of_year}<br />`)
        size = 2
        slice = self.blob.slice(offset, offset + size)
        offset += size
        reader.readAsArrayBuffer(slice)
      } else if (offset == 96) {
        const header_size = (new DataView(e.target.result)).getUint16(0, true)
        target.insertAdjacentHTML('beforeend', `<b>header_size: </b>${header_size}<br />`)
        size = 4
        slice = self.blob.slice(offset, offset + size)
        offset += size
        reader.readAsArrayBuffer(slice)
      } else if (offset == 100) {
        const offset_to_point_data = (new DataView(e.target.result)).getUint32(0, true)
        target.insertAdjacentHTML('beforeend', `<b>offset_to_point_data: </b>${offset_to_point_data}<br />`)
        size = 4
        slice = self.blob.slice(offset, offset + size)
        offset += size
        reader.readAsArrayBuffer(slice)
      } else if (offset == 104) {
        const number_of_variable_length_records = (new DataView(e.target.result)).getUint32(0, true)
        target.insertAdjacentHTML('beforeend', `<b>number_of_variable_length_records: </b>${number_of_variable_length_records}<br />`)
        size = 1
        slice = self.blob.slice(offset, offset + size)
        offset += size
        reader.readAsArrayBuffer(slice)
      } else if (offset == 105) {
        const point_data_format_id = (new DataView(e.target.result)).getUint8()
        target.insertAdjacentHTML('beforeend', `<b>point_data_format_id: </b>${point_data_format_id}<br />`)
        size = 2
        slice = self.blob.slice(offset, offset + size)
        offset += size
        reader.readAsArrayBuffer(slice)
      } else if (offset == 107) {
        const point_data_record_length = (new DataView(e.target.result)).getUint16(0, true)
        target.insertAdjacentHTML('beforeend', `<b>point_data_record_length: </b>${point_data_record_length}<br />`)
        this.point_data_record_length = point_data_record_length
        size = 4
        slice = self.blob.slice(offset, offset + size)
        offset += size
        reader.readAsArrayBuffer(slice)
      } else if (offset == 111) {
        const number_of_point_records = (new DataView(e.target.result)).getUint32(0, true)
        target.insertAdjacentHTML('beforeend', `<b>number_of_point_records: </b>${number_of_point_records}<br />`)
        this.number_of_point_records = number_of_point_records
        size = 4
        slice = self.blob.slice(offset, offset + size)
        offset += size
        reader.readAsArrayBuffer(slice)
      } else if (offset == 115) {
        const number_of_points_by_return = (new DataView(e.target.result)).getUint16(0, true)
        target.insertAdjacentHTML('beforeend', `<b>number_of_points_by_return 0: </b>${number_of_points_by_return}<br />`)
        this.point_data_record_length += number_of_points_by_return
        size = 4
        slice = self.blob.slice(offset, offset + size)
        offset += size
        reader.readAsArrayBuffer(slice)
      } else if (offset == 119) {
        const number_of_points_by_return = (new DataView(e.target.result)).getUint16(0, true)
        target.insertAdjacentHTML('beforeend', `<b>number_of_points_by_return 1: </b>${number_of_points_by_return}<br />`)
        this.point_data_record_length += number_of_points_by_return
        size = 4
        slice = self.blob.slice(offset, offset + size)
        offset += size
        reader.readAsArrayBuffer(slice)
      } else if (offset == 123) {
        const number_of_points_by_return = (new DataView(e.target.result)).getUint16(0, true)
        target.insertAdjacentHTML('beforeend', `<b>number_of_points_by_return 2: </b>${number_of_points_by_return}<br />`)
        this.point_data_record_length += number_of_points_by_return
        size = 4
        slice = self.blob.slice(offset, offset + size)
        offset += size
        reader.readAsArrayBuffer(slice)
      } else if (offset == 127) {
        const number_of_points_by_return = (new DataView(e.target.result)).getUint16(0, true)
        target.insertAdjacentHTML('beforeend', `<b>number_of_points_by_return 3: </b>${number_of_points_by_return}<br />`)
        this.point_data_record_length += number_of_points_by_return
        size = 4
        slice = self.blob.slice(offset, offset + size)
        offset += size
        reader.readAsArrayBuffer(slice)
      } else if (offset == 131) {
        const number_of_points_by_return = (new DataView(e.target.result)).getUint16(0, true)
        target.insertAdjacentHTML('beforeend', `<b>number_of_points_by_return 4: </b>${number_of_points_by_return}<br />`)
        this.point_data_record_length += number_of_points_by_return
        if (this.point_data_record_length == 0) {
          this.point_data_record_length = number_of_point_records
        }
        target.insertAdjacentHTML('beforeend', `<b>point_data_record_length: </b>${this.point_data_record_length}<br />`)
        size = 8
        slice = self.blob.slice(offset, offset + size)
        offset += size
        reader.readAsArrayBuffer(slice)
      } else if (offset == 139) {
        const scale_factor_x = (new DataView(e.target.result)).getFloat64(0, true)
        target.insertAdjacentHTML('beforeend', `<b>scale_factor_x: </b>${scale_factor_x}<br />`)
        size = 8
        slice = self.blob.slice(offset, offset + size)
        offset += size
        reader.readAsArrayBuffer(slice)
      } else if (offset == 147) {
        const scale_factor_y = (new DataView(e.target.result)).getFloat64(0, true)
        target.insertAdjacentHTML('beforeend', `<b>scale_factor_y: </b>${scale_factor_y}<br />`)
        size = 8
        slice = self.blob.slice(offset, offset + size)
        offset += size
        reader.readAsArrayBuffer(slice)
      } else if (offset == 155) {
        const scale_factor_z = (new DataView(e.target.result)).getFloat64(0, true)
        target.insertAdjacentHTML('beforeend', `<b>scale_factor_z: </b>${scale_factor_z}<br />`)
        size = 8
        slice = self.blob.slice(offset, offset + size)
        offset += size
        reader.readAsArrayBuffer(slice)
      } else if (offset == 163) {
        const offset_x = (new DataView(e.target.result)).getFloat64(0, true)
        target.insertAdjacentHTML('beforeend', `<b>offset_x: </b>${offset_x}<br />`)
        size = 8
        slice = self.blob.slice(offset, offset + size)
        offset += size
        reader.readAsArrayBuffer(slice)
      } else if (offset == 171) {
        const offset_y = (new DataView(e.target.result)).getFloat64(0, true)
        target.insertAdjacentHTML('beforeend', `<b>offset_y: </b>${offset_y}<br />`)
        size = 8
        slice = self.blob.slice(offset, offset + size)
        offset += size
        reader.readAsArrayBuffer(slice)
      } else if (offset == 179) {
        const offset_z = (new DataView(e.target.result)).getFloat64(0, true)
        target.insertAdjacentHTML('beforeend', `<b>offset_z: </b>${offset_z}<br />`)
        size = 16
        slice = self.blob.slice(offset, offset + size)
        offset += size
        reader.readAsArrayBuffer(slice)
      } else if (offset == 195) {
        const x = new DataView(e.target.result)
        max_x = x.getFloat64(0, true)
        min_x = x.getFloat64(8, true)
        target.insertAdjacentHTML('beforeend', `<b>max x: </b>${max_x}, <b>min x: </b>${min_x}<br />`)
        size = 16
        slice = self.blob.slice(offset, offset + size)
        offset += size
        reader.readAsArrayBuffer(slice)
      } else if (offset == 211) {
        const y = new DataView(e.target.result)
        max_y = y.getFloat64(0, true)
        min_y = y.getFloat64(8, true)
        target.insertAdjacentHTML('beforeend', `<b>max y: </b>${max_y}, <b>min y: </b>${min_y}<br />`)
        size = 16
        slice = self.blob.slice(offset, offset + size)
        offset += size
        reader.readAsArrayBuffer(slice)
      } else if (offset == 227) {
        const z = new DataView(e.target.result)
        const max_z = z.getFloat64(0, true)
        const min_z = z.getFloat64(8, true)
        target.insertAdjacentHTML('beforeend', `<b>max z: ${max_z}</b>, <b>min z: </b>${min_z}<br />`)
      } else {
        // finish
        reader.abort()
      }
    }
    reader.onloadend = function () {
      if (reader.readyState == FileReader.DONE) {
        console.log('done')
        callback(max_x, min_x, max_y, min_y)
      }
    }
    reader.readAsArrayBuffer(slice)
  }
}

var char_to_string = function(array_buffer) {
  var data_view = new DataView(array_buffer)
  var ret = ""
  for (var i = 0; i < data_view.byteLength; i++) {
    ret += String.fromCharCode(data_view.getInt8(i))
  }
  return ret
}
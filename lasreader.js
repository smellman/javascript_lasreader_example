'use strict';

class LasParser {
  constructor(blob) {
    this.blob = blob
    this.offset = 0
    this.reader = new FileReader()
  }

  readSlice(size) {
    return new Promise((resolve, reject) => {
      this.reader.onload = (e) => {
        this.offset += size
        resolve(e.target.result)
      }
      this.reader.onerror = (e) => {
        console.log('onerror')
        reject(e)
      }
      const slice = this.blob.slice(this.offset, this.offset + size)
      this.reader.readAsArrayBuffer(slice)
    })
  }

  async read(target, callback) {
    target.innerHTML = ''
    let result = await this.readSlice(4)
    const file_signature = char_to_string(result)
    target.insertAdjacentHTML('afterbegin', `<b>file_signature: </b>${file_signature}<br />`)
    result = await this.readSlice(2)
    const file_source_id = (new DataView(result)).getUint16()
    target.insertAdjacentHTML('beforeend', `<b>file_source_id: </b>${file_source_id}<br />`)
    result = await this.readSlice(2)
    const global_encording = (new DataView(result)).getUint16(0, true)
    target.insertAdjacentHTML('beforeend', `<b>global_encording: </b>${global_encording}<br />`)
    result = await this.readSlice(4)
    const guid_data1 = (new DataView(result)).getUint32(0, true)
    target.insertAdjacentHTML('beforeend', `<b>guid_data1: </b>${guid_data1}<br />`)
    result = await this.readSlice(2)
    const guid_data2 = (new DataView(result)).getUint16()
    target.insertAdjacentHTML('beforeend', `<b>guid_data2: </b>${guid_data2}<br />`)
    result = await this.readSlice(2)
    const guid_data3 = (new DataView(result)).getUint16()
    target.insertAdjacentHTML('beforeend', `<b>guid_data3: </b>${guid_data3}<br />`)
    await this.readSlice(8) // skip unsigned char[8]
    result = await this.readSlice(2)
    const version = new DataView(result)
    const version_major = version.getInt8(0)
    const version_minor = version.getInt8(1)
    target.insertAdjacentHTML('beforeend', `<b>version: </b>${version_major}.${version_minor}<br />`)
    result = await this.readSlice(32)
    const system_identifier = char_to_string(result)
    target.insertAdjacentHTML('beforeend', `<b>system_identifier: </b>${system_identifier}<br />`)
    result = await this.readSlice(32)
    const generate_software = char_to_string(result)
    target.insertAdjacentHTML('beforeend', `<b>generate_software: </b>${generate_software}<br />`)
    result = await this.readSlice(4)
    const create_at = new DataView(result)
    const create_day_of_year = create_at.getUint16(0, true)
    const create_year = create_at.getUint16(2, true)
    target.insertAdjacentHTML('beforeend', `<b>create year</b> ${create_year} <b>day</b> ${create_day_of_year}<br />`)
    result = await this.readSlice(2)
    const header_size = (new DataView(result)).getUint16(0, true)
    target.insertAdjacentHTML('beforeend', `<b>header_size: </b>${header_size}<br />`)
    result = await this.readSlice(4)
    const offset_to_point_data = (new DataView(result)).getUint32(0, true)
    target.insertAdjacentHTML('beforeend', `<b>offset_to_point_data: </b>${offset_to_point_data}<br />`)
    result = await this.readSlice(4)
    const number_of_variable_length_records = (new DataView(result)).getUint32(0, true)
    target.insertAdjacentHTML('beforeend', `<b>number_of_variable_length_records: </b>${number_of_variable_length_records}<br />`)
    result = await this.readSlice(1)
    const point_data_format_id = (new DataView(result)).getUint8()
    target.insertAdjacentHTML('beforeend', `<b>point_data_format_id: </b>${point_data_format_id}<br />`)
    result = await this.readSlice(2)
    let point_data_record_length = (new DataView(result)).getUint16(0, true)
    target.insertAdjacentHTML('beforeend', `<b>point_data_record_length: </b>${point_data_record_length}<br />`)
    result = await this.readSlice(4)
    let number_of_point_records = (new DataView(result)).getUint32(0, true)
    target.insertAdjacentHTML('beforeend', `<b>number_of_point_records: </b>${number_of_point_records}<br />`)
    result = await this.readSlice(4)
    const number_of_points_by_return_0 = (new DataView(result)).getUint16(0, true)
    target.insertAdjacentHTML('beforeend', `<b>number_of_points_by_return 0: </b>${number_of_points_by_return_0}<br />`)
    point_data_record_length += number_of_points_by_return_0
    result = await this.readSlice(4)
    const number_of_points_by_return_1 = (new DataView(result)).getUint16(0, true)
    target.insertAdjacentHTML('beforeend', `<b>number_of_points_by_return 1: </b>${number_of_points_by_return_1}<br />`)
    point_data_record_length += number_of_points_by_return_1
    result = await this.readSlice(4)
    const number_of_points_by_return_2 = (new DataView(result)).getUint16(0, true)
    target.insertAdjacentHTML('beforeend', `<b>number_of_points_by_return 2: </b>${number_of_points_by_return_2}<br />`)
    point_data_record_length += number_of_points_by_return_2
    result = await this.readSlice(4)
    const number_of_points_by_return_3 = (new DataView(result)).getUint16(0, true)
    target.insertAdjacentHTML('beforeend', `<b>number_of_points_by_return 3: </b>${number_of_points_by_return_3}<br />`)
    this.point_data_record_length += number_of_points_by_return_3
    result = await this.readSlice(4)
    const number_of_points_by_return = (new DataView(result)).getUint16(0, true)
    target.insertAdjacentHTML('beforeend', `<b>number_of_points_by_return 4: </b>${number_of_points_by_return}<br />`)
    point_data_record_length += number_of_points_by_return
    if (point_data_record_length == 0) {
      point_data_record_length = number_of_point_records
    }
    result = await this.readSlice(8)
    const scale_factor_x = (new DataView(result)).getFloat64(0, true)
    target.insertAdjacentHTML('beforeend', `<b>scale_factor_x: </b>${scale_factor_x}<br />`)
    result = await this.readSlice(8)
    const scale_factor_y = (new DataView(result)).getFloat64(0, true)
    target.insertAdjacentHTML('beforeend', `<b>scale_factor_y: </b>${scale_factor_y}<br />`)
    result = await this.readSlice(8)
    const scale_factor_z = (new DataView(result)).getFloat64(0, true)
    target.insertAdjacentHTML('beforeend', `<b>scale_factor_z: </b>${scale_factor_z}<br />`)
    result = await this.readSlice(8)
    const offset_x = (new DataView(result)).getFloat64(0, true)
    target.insertAdjacentHTML('beforeend', `<b>offset_x: </b>${offset_x}<br />`)
    result = await this.readSlice(8)
    const offset_y = (new DataView(result)).getFloat64(0, true)
    target.insertAdjacentHTML('beforeend', `<b>offset_y: </b>${offset_y}<br />`)
    result = await this.readSlice(8)
    const offset_z = (new DataView(result)).getFloat64(0, true)
    target.insertAdjacentHTML('beforeend', `<b>offset_z: </b>${offset_z}<br />`)
    result = await this.readSlice(16)
    const x = new DataView(result)
    const max_x = x.getFloat64(0, true)
    const min_x = x.getFloat64(8, true)
    target.insertAdjacentHTML('beforeend', `<b>max x: </b>${max_x}, <b>min x: </b>${min_x}<br />`)
    result = await this.readSlice(16)
    const y = new DataView(result)
    const max_y = y.getFloat64(0, true)
    const min_y = y.getFloat64(8, true)
    target.insertAdjacentHTML('beforeend', `<b>max y: </b>${max_y}, <b>min y: </b>${min_y}<br />`)
    const z = new DataView(result)
    const max_z = z.getFloat64(0, true)
    const min_z = z.getFloat64(8, true)
    target.insertAdjacentHTML('beforeend', `<b>max z: ${max_z}</b>, <b>min z: </b>${min_z}<br />`)
    this.reader.abort()
    callback(max_x, min_x, max_y, min_y)
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
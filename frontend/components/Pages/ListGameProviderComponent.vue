<template>
  <a-modal v-model:open="openUploadimage" title="เเก้ไขรูปภาพ" >
    <p>ขนาดไฟล์ในการอัปโหลด ขนาดเเนะนำ 1:2 ไฟล์ PNG JPG JPEG </p>
    <a-upload-dragger
        v-model:fileList="fileList"
        name="file"
        :showUploadList=false
        class="image-upload"
        @change="handleChange"
    >
        <div class="image-upload-text">
            <div v-if="ImageText">
                <p class="ant-upload-drag-icon">
                    <inbox-outlined></inbox-outlined>
                </p>
                <p class="ant-upload-text">Click or drag file to this area to upload QR Code</p>
                <p class="ant-upload-hint">
                    โปรดเช็คขนาดไฟล์ในการอัปโหลด ขนาดเเนะนำ 1:1 ไฟล์ PNG JPG JPEG
                </p>
            </div>
        </div>
        <div v-if="previewImage" class="preview-image-container">
            <img :src="previewImage" class="preview-image" style="width: 350px;">
        </div>
    </a-upload-dragger>
    <template #footer>
        <a-button @click="closeModal()" class="m-1">Cancel</a-button>
        <a-button @click="uploadImage()" type="primary" class="m-1 sky">อัปโหลด</a-button>
    </template>
  </a-modal>
  <a-row>
    <a-modal v-model:open="open" title="Sysnc เกมส์" >
      <a-row>
        <a-col span="24" class="my-1">
          <label for="product">Product</label>
          <a-select
            ref="select"
            v-model:value="formData.product"
            style="width: 100%"
          >
            <a-select-option value="">ทั้งหมด</a-select-option>
            <a-select-option value="Gplay">Gplay</a-select-option>
          </a-select>
        </a-col>
        <a-col span="24" class="my-1">
          <label for="ผู้ใหบริการเกมส์">ผู้ให้บริการเกมส์</label>
          <a-select
            v-model:value="formData.provider"
            style="width: 100%"
            showSearch
            placeholder="เลือกผู้ให้บริการ"
            :filterOption="filterOption"
          >
            <a-select-option value="">ทั้งหมด</a-select-option>
            <a-select-option
              v-for="item in formData.game"
              :key="item.provider"
              :value="item.name"
            >
              {{ item.name }}
            </a-select-option>
          </a-select>
        </a-col>
        <a-col span="24">
          <h4>เลือกอัพเดตข้อมูลเกมส์</h4>
          <a-row>
            <a-col span="24" :md="6">
              <a-checkbox v-model:checked="formData.selectAll" @change="selectAll()">ทั้งหมด</a-checkbox>
            </a-col>
            <a-col span="24" :md="6">
              <a-checkbox v-model:checked="formData.name">ชื่อเกมส์</a-checkbox>
            </a-col>
            <a-col span="24" :md="6">
              <a-checkbox v-model:checked="formData.productCode">คีย์เกมส์</a-checkbox>
            </a-col>
            <a-col span="24" :md="6">
              <a-checkbox v-model:checked="formData.image">รูปภาพ</a-checkbox>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
      <a-col span="24" class="center" style="margin-top: 15px;">
        <h3>คำเตือน</h3>
        ระบบใช้เวลาในการ sysnc รายการเกมส์ 3-5 นาที
      </a-col>
      <template #footer>
        <a-row :justify="'center'">
          <a-button @click="open = false" class="m-1">Cancel</a-button>
          <a-button @click="sysDataListGame()" type="primary" :loading="store.sysnceData" class="m-1 sky">Sysnc</a-button>
        </a-row>
      </template>
    </a-modal>
    <a-breadcrumb>
        <a-breadcrumb-item><NuxtLink to="/setting/game-provider">ตั้งค่าค่ายเกมส์</NuxtLink></a-breadcrumb-item>
        <a-breadcrumb-item>ตั้งค่าค่ายลิสเกมส์</a-breadcrumb-item>
    </a-breadcrumb>
    <a-col span="24" class="my-2">
      <a-button type="primary" @click="showModal" :loading="store.sysnceData" ghost>Sysnc เกมส์</a-button>
    </a-col>
  </a-row>
  <a-row style="margin-bottom: 1rem;">
      <a-col :span="6" style="padding-right: 5px;">
        <label>product</label>
        <a-select
            ref="select"
            v-model:value="formData.sl_type"
            style="width: 100%"
            >
            <a-select-option value="">ทั้งหมด</a-select-option>
            <a-select-option value="Gplay">Gplay</a-select-option>
        </a-select>
      </a-col>
      <a-col :span="6" style="padding-right: 5px;">
        <label>เลือกผู้ให้บริการ</label>
        <a-select
            v-model:value="formData.de_type"
            style="width: 100%"
            showSearch
            placeholder="เลือกผู้ให้บริการ"
            :filterOption="filterOption"
          >
            <a-select-option value="">ทั้งหมด</a-select-option>
            <a-select-option
              v-for="item in formData.game"
              :key="item.name"
              :value="item.name"
            >
              {{ item.name }}
            </a-select-option>
          </a-select>
      </a-col>
      <a-col :span="6" style="padding-right: 5px;">
        <label>ชื่อเกมส์</label>
        <a-input v-model:value="formData.gameName" placeholder="gameName" />
      </a-col>
      <a-col :span="24" :md="4" :lg="2">
        <label><br></label>
        <a-button class="submit sky" type="primary" @click="search"><SearchOutlined /> ค้นหา</a-button>
      </a-col>
    </a-row>
  <a-row>
    <a-table 
      :columns="dynamicColumns" 
      :data-source="dataShow" 
      :scroll="{ x: 1500, y: 700 }"
      bordered
      :pagination="paginationConfig"
      :loading="loading"
      @change="handleTableChange"
      >
      <template #bodyCell="{ column, record, index }">
        <template v-if="column.key === 'id'">
          <div >{{index + 1}}</div>
        </template>
        <template v-if="column.key === 'image'">
          <a-image
            width="100px"
            :src="record.image_upload"
            :preview="false"
            v-if="record.image_upload != ''"
          />
          <a-image
            width="100px"
            :src="record.image"
            :preview="false"
            v-else-if="record.image != ''"
          />
          <div v-else @click="showModalUploadimage(record)"> <a-button type="primary" ghost>เพิ่มรูป</a-button> </div>
        </template>
        <template v-if="column.key === 'date'">
          <div >{{ dayjs(record.updated_at).format('YYYY-MM-DD') }} <br> {{ dayjs(record.updated_at).format('HH:mm:ss') }}</div>
        </template>
      </template>
    </a-table>
  </a-row>
</template>
<script lang="ts" setup>
import { getSettingListGameServices,sysDataListGameServices,getListGameServices } from '~/services/settingGameService';
import { uploadImageGameListServices } from '~/services/settingGameService';
import type { SelectProps } from "ant-design-vue";
import dayjs from 'dayjs';
import type { UploadFile } from 'ant-design-vue';
import type { UploadChangeParam } from 'ant-design-vue';
import { Alert } from '../Alert/alertComponent';
import { notifyStore } from '~/store/index';

const route = useRoute();
const gameDetail = ref({ name: route.query.game || 'ไม่พบชื่อเกม' });

const store = notifyStore();
const open = ref<boolean>(false);
const openUploadimage = ref<boolean>(false);
const dataShow = ref<any[]>([]);
const loading = ref(true);
// const load = ref(false);
const allRecord = ref<number>(0);
const fileList = ref<UploadFile<any>[]>([]);
const ImageText = ref(true);
const previewImage = ref('');
const Image = ref<any>(null);
const dataGame = ref<any>(null);
const formData = reactive({
  sl_type:'',
  de_type:'',
  page:1,
  pageSize:10,
  gameName:'',
  game: [] as any,
  product: '',
  provider: '',
  selectAll: false,
  name: false,
  productCode: false,
  image: false,
})


const dynamicColumns = computed(() => {
    return [
      { 
        title: `ทั้งหมด ${allRecord.value} รายการ`, 
        children: [
      { title: 'id', width:60, dataIndex: 'id', key: 'id' },
      { title: 'product', width:60, dataIndex: 'product', key: 'product' },
      { title: 'ผู้ให้บริการ', width: 60, dataIndex: 'provider', key: 'provider'},
      { title: 'ชื่อเกมส์', dataIndex: 'name', key: 'name', width: 60 },
      { title: 'รูป', dataIndex: 'image', key: 'image', width: 60 },
      { title: 'วันที่', dataIndex: 'date', key: 'date', width: 60 },
      ] 
    },
  ];
});

const handleChange = async (info: UploadChangeParam) => {
      const status = info.file.status;
      const file = info.file.originFileObj; // File object

      if (file instanceof File) {
          const reader = new FileReader();

          reader.onload = () => {
              const base64String = reader.result as string;
              if (base64String) {
                  previewImage.value = base64String;
                  Image.value = base64String;
              }
          };
          ImageText.value = false;
          reader.readAsDataURL(file);
      }
      
      if (status !== 'uploading') {
          console.log(info.file, info.fileList);
      }
      
      if (status === 'done') {
          message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
          message.error(`อัพโหลดรูปภาพเรียบร้อย`);
      }
  };

const uploadImage = async() => {
  const data = await uploadImageGameListServices(dataGame.value,Image.value);
      if(data.status == "success"){
          Alert('success','ตั้งค่าเกมส์ PG เรียบร้อย.')
          // getGamePGList();
          getListGame();
      }else{
          Alert('error',data.message);
          // getGamePGList();
      }
};

const showModal = () => {
  open.value = true;
};

const showModalUploadimage = (game :any) => {
  openUploadimage.value = true;
  dataGame.value = game 
};
const selectAll = () => {
  formData.name = formData.selectAll;
  formData.productCode = formData.selectAll;
  formData.image = formData.selectAll;
};

const getListProduct = async() => {
  const data = await getSettingListGameServices();
    if (data.status === "success") {
      formData.game = data.data
    }
}

const getListGame = async() => {
  loading.value = true
  const data = await getListGameServices(formData);
    if (data.status === "success") {
      // formData.game = data.data
      dataShow.value = data.data.data
      allRecord.value = data.data.total
      paginationConfig.value.total = data.data.total;
    }
  loading.value = false
}

const search = async() => {
  formData.page = 1
  getListGame()
}

const sysDataListGame = async() => {
  // load.value = true
  store.sysnceData = true
  const data = await sysDataListGameServices(formData);
    if (data.status === "success") {
      Alert('success','Sysnc ข้อมูลเกมส์เรียบร้อยเเล้ว.')
      // dataShow.value = data.data
      open.value = false
  }
  store.sysnceData = false
  // load.value = false
}

const closeModal = () => {
  openUploadimage.value = false;
};


const filterOption: SelectProps["filterOption"] = (input :any, option :any) => {
  return option?.value?.toString().toLowerCase().includes(input.toLowerCase());
};

const paginationConfig = ref({
  current: 1,
  pageSize: 10,
  total: 0,
  showTotal: (total: number) => `ทั้งหมด ${total} รายการ`,
});

const handleTableChange = (pagination: any) => {
  formData.page = pagination.current
  formData.pageSize = pagination.pageSize
  getListGame();
  paginationConfig.value.current = pagination.current
  paginationConfig.value.pageSize = pagination.pageSize
};

onMounted(() => {
  formData.de_type = String(gameDetail.value.name)
  getListProduct();
  getListGame();
});
</script>
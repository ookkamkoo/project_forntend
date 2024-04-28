<template>
    <a-tabs v-model:activeKey="activeKey" type="card">
      <a-tab-pane key="1" tab="ทั่วไป">
          <h2>เว็บไซต์</h2>
          <a-row>
              <a-col :span="12" :md="12" class="p-1">
                  <label for="Production"><b >Production</b></label>
                  <a-select
                      v-model:value="formData.product"
                      style="width: 100%"
                      :options="Constants.optionsProduct"
                      :disabled="true"
                  ></a-select>
              </a-col>
              <a-col :span="12" :md="12" class="p-1">
                  <label for="TitleWebsite"><b  class="request">Title website</b></label>
                  <a-form-item 
                      ref="TitleWebsite" 
                      name="TitleWebsite"
                      :rules="[{ required: true, message: 'โปรดกรอกชื่อบัญชี!' }]"
                      >
                      <a-input v-model:value="formData.titleWebsite"/>
                  </a-form-item>
              </a-col>
              <a-col :span="12" :md="12" class="p-1">
                <label for="DiscriptionsWebsite"><b  class="request">Discriptions website</b></label>
                <a-form-item 
                    ref="DiscriptionsWebsite" 
                    name="DiscriptionsWebsite"
                    :rules="[{ required: true, message: 'โปรดกรอกชื่อบัญชี!' }]"
                    >
                    <a-input v-model:value="formData.discriptionsWebsite"/>
                </a-form-item>
              </a-col>
              <a-col :span="12" :md="12" class="p-1">
                  <label for="WebsiteKeyword"><b  class="request">Website keyword</b></label>
                  <a-form-item 
                      ref="WebsiteKeyword" 
                      name="WebsiteKeyword"
                      :rules="[{ required: true, message: 'โปรดกรอกชื่อบัญชี!' }]"
                      >
                      <a-input v-model:value="formData.websiteKeyword"/>
                  </a-form-item>
              </a-col>
              <a-col :span="12" :md="12" class="p-1">
                  <label for="WebsiteUrl"><b  class="request">Website Url</b></label>
                  <a-form-item 
                      ref="WebsiteUrl" 
                      name="WebsiteUrl"
                      :rules="[{ required: true, message: 'โปรดกรอกชื่อบัญชี!' }]"
                      >
                      <a-input v-model:value="formData.websiteUrl"/>
                  </a-form-item>
              </a-col>
          </a-row>
          <a-row>
            <a-col :span="24" :md="12" class="p-1 my-2">
                  <label for="clearWithdrawMin"><b  class="request">ไอคอนเว็บ ขนาด ( w1 : h1 )</b></label>
                  <div v-if="!ImageText" class="close-image" @click="clearPreviewImage">
                      <CloseCircleOutlined />
                  </div>
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
                                <p class="ant-upload-text">Click or drag file to this area to upload</p>
                                <p class="ant-upload-hint">
                                    โปรดเช็คขนาดไฟล์ในการอัปโหลด ขนาดเเนะนำ w1:h1 ไฟล์ PNG JPG JPEG
                                </p>
                            </div>
                        </div>
                        <div v-if="previewImage" class="preview-image-container">
                            <img :src="previewImage" class="preview-image" style="width: 350px;">
                        </div>
                    </a-upload-dragger>
              </a-col>

              <a-col :span="24" :md="12" class="p-1 my-2">
                  <label for="clearWithdrawMin"><b  class="request">โลโก้เว็บ ขนาด ( w3 : h1 ) แนวนอนดีที่สุด</b></label>
                  <div v-if="!ImageTextLogo" class="close-image" @click="clearPreviewImageLogo">
                      <CloseCircleOutlined />
                  </div>
                  <a-upload-dragger
                        v-model:fileList="fileListLogo"
                        name="file"
                        :showUploadList=false
                        class="image-upload"
                        @change="handleChangeLogo"
                    >
                        <div class="image-upload-text">
                            <div v-if="ImageTextLogo">
                                <p class="ant-upload-drag-icon">
                                    <inbox-outlined></inbox-outlined>
                                </p>
                                <p class="ant-upload-text">Click or drag file to this area to upload</p>
                                <p class="ant-upload-hint">
                                    โปรดเช็คขนาดไฟล์ในการอัปโหลด ขนาดเเนะนำ w3:h1 ไฟล์ PNG JPG JPEG
                                </p>
                            </div>
                        </div>
                        <div v-if="previewImageLogo" class="preview-image-container">
                            <img :src="previewImageLogo" class="preview-image" style="width: 350px;">
                        </div>
                    </a-upload-dragger>
              </a-col>
          </a-row>
          <h2>ทั่วไป</h2>
          <a-row>
            <a-col :span="12" :md="12" class="p-1">
                  <label for="clearWithdrawMin"><b  class="request">เคลียยอดเทิร์น</b></label>
                  <a-form-item 
                      ref="clearWithdrawMin" 
                      name="clearWithdrawMin"
                      :rules="[{ required: true, message: 'โปรดกรอกชื่อบัญชี!' }]"
                      >
                      <a-input v-model:value="formData.clearWithdrawMin"/>
                  </a-form-item>
              </a-col>
              <a-col :span="12" :md="12" class="p-1">
                  <label for="turnWithdrawNormal"><b  class="request">ยอดเทิร์นฝากปกติ</b></label>
                  <a-form-item 
                      ref="turnWithdrawNormal" 
                      name="turnWithdrawNormal"
                      :rules="[{ required: true, message: 'โปรดกรอกชื่อบัญชี!' }]"
                      >
                      <a-input v-model:value="formData.turnWithdrawNormal"/>
                  </a-form-item>
              </a-col>
              <a-col :span="12" :md="12" class="p-1">
                <label for="password"><b class="request">พาสเวิร์ด ลูกค้า</b></label>
                <a-form-item 
                    ref="password" 
                    name="password"
                    :rules="[{ required: true, message: 'โปรดกรอกชื่อบัญชี!' }]"
                    >
                    <a-input v-model:value="formData.password"/>
                </a-form-item>
              </a-col>
          </a-row>
          <a-row>
            <a-col :span="24" :md="24" class="p-1">
              <b>เเสดงเบอร์โทรศัพท์ลูกค้า</b> 
            </a-col>
            <a-col :span="24" :md="24" class="p-1">
              <a-switch v-model:checked="formData.openUsername" />
            </a-col>
          </a-row>
          <h2>ระบบสมัครสมาชิก</h2>
          <a-row>
            <a-col :span="24" :md="24" class="p-1">
              <b>สถานะดึงชื่อลูกค้า</b> 
            </a-col>
            <a-col :span="24" :md="24" class="p-1">
              <a-switch v-model:checked="formData.getNameMember" />
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="24" :md="24" class="p-1">
              <b>สถานะการจำกัดชื่อ - นามสกุลซ้ำ</b> 
            </a-col>
            <a-col :span="24" :md="24" class="p-1">
              <a-switch v-model:checked="formData.checkName" />
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="24" :md="24" class="p-1">
              <b>สมัครสมาชิก บัญชีทรูวอเล็ท</b> 
            </a-col>
            <a-col :span="24" :md="24" class="p-1">
              <a-switch v-model:checked="formData.regisTrue" />
            </a-col>
          </a-row>
      </a-tab-pane>
      <a-tab-pane key="2" tab="ฝาก - ถอน">
        <h2>ฝากเงิน</h2>
        <a-row>
          <a-col :span="12" :md="12" class="p-1">
            <a-col :span="24" :md="24">
              <b>ฝากเงินอัตโนมัติ</b> 
            </a-col>
            <a-col :span="24" :md="24" >
              <a-switch v-model:checked="formData.depositAuto" />
            </a-col>
          </a-col>
          <a-col :span="12" :md="12" class="p-1">
            <a-col :span="24" :md="24">
              <b>ฝากเงินโดยการทำรายการ</b>
            </a-col>
            <a-col :span="24" :md="24" >
              <a-switch v-model:checked="formData.memberCreateDeposit" />
            </a-col>
          </a-col>
          <a-col :span="12" :md="12" class="p-1">
              <label for="ฝากเงินขั้นต่ำ"><b  class="request">ฝากเงินขั้นต่ำ</b></label>
              <a-form-item 
                  ref="depositMin" 
                  name="depositMin"
                  :rules="[{ required: true, message: 'โปรดกรอกชื่อบัญชี!' }]"
                  >
                  <a-input v-model:value="formData.depositMin"/>
              </a-form-item>
          </a-col>
          <a-col :span="12" :md="12" class="p-1">
              <label for="ฝากเงินสูงสุด"><b  class="request">ฝากเงินสูงสุด</b></label>
              <a-form-item 
                  ref="depositMax" 
                  name="depositMax"
                  :rules="[{ required: true, message: 'โปรดกรอกชื่อบัญชี!' }]"
                  >
                  <a-input v-model:value="formData.depositMax"/>
              </a-form-item>
          </a-col>
        </a-row>
        <h2>ถอนเงิน</h2>
        <a-row>
          <a-col :span="12" :md="12" class="p-1">
              <a-col :span="24" :md="24">
                <b>สถานะถอนเงิน</b> 
              </a-col>
              <a-col :span="24" :md="24" >
                <a-switch v-model:checked="formData.statusWithdraw" />
              </a-col>
          </a-col>
          <a-col :span="12" :md="12" class="p-1">
            <a-col :span="24" :md="24" >
              <b>บังคับถอนเงินทั้งหมด</b> 
            </a-col>
            <a-col :span="24" :md="24">
              <a-switch v-model:checked="formData.withdrawAll" />
            </a-col>
          </a-col>
          <a-col :span="12" :md="12" class="p-1">
              <label for="ถอนเงินขั้นต่ำ"><b  class="request">ถอนเงินขั้นต่ำ</b></label>
              <a-form-item 
                  ref="withdrawMin" 
                  name="withdrawMin"
                  :rules="[{ required: true, message: 'โปรดกรอกชื่อบัญชี!' }]"
                  >
                  <a-input v-model:value="formData.withdrawMin"/>
              </a-form-item>
          </a-col>
          <a-col :span="12" :md="12" class="p-1">
              <label for="ถอนสูงสุดต่อครั้ง"><b  class="request">ถอนสูงสุดต่อครั้ง</b></label>
              <a-form-item 
                  ref="withdrawAroundMax" 
                  name="withdrawAroundMax"
                  :rules="[{ required: true, message: 'โปรดกรอกชื่อบัญชี!' }]"
                  >
                  <a-input v-model:value="formData.withdrawAroundMax"/>
              </a-form-item>
          </a-col>
          <a-col :span="12" :md="12" class="p-1">
              <label for="ยอดถอนรวมต่อวัน"><b  class="request">ยอดถอนรวมต่อวัน</b></label>
              <a-form-item 
                  ref="withdrawAroundDay" 
                  name="withdrawAroundDay"
                  :rules="[{ required: true, message: 'โปรดกรอกชื่อบัญชี!' }]"
                  >
                  <a-input v-model:value="formData.withdrawAroundDay"/>
              </a-form-item>
          </a-col>
          <a-col :span="12" :md="12" class="p-1">
              <label for="จำนวนรายการถอนต่อวัน"><b  class="request">จำนวนรายการถอนต่อวัน</b></label>
              <a-form-item 
                  ref="withdrawAround" 
                  name="withdrawAround"
                  :rules="[{ required: true, message: 'โปรดกรอกชื่อบัญชี!' }]"
                  >
                  <a-input v-model:value="formData.withdrawAround"/>
              </a-form-item>
          </a-col>
        </a-row>
      </a-tab-pane>
      <a-tab-pane key="3" tab="ระบบออโต้">
        <h2>คืนยอดเสีย</h2>
        <a-row>
          <a-col :span="24" :md="24" class="p-2">
              <a-col :span="24" :md="24">
                <b>สถานะคืนยอดเสีย</b> 
              </a-col>
              <a-col :span="24" :md="24" >
                <a-switch v-model:checked="formData.refundLost" />
              </a-col>
          </a-col>
          <a-col :span="12" :md="12" class="p-2">
            <label for="ประเภทการคืน"><b class="request">ประเภทการคืน</b></label>
            <a-select
                v-model:value="formData.typeRefundLost"
                style="width: 100%"
                :options="Constants.optionsLose"
            ></a-select>
          </a-col>
          <a-col :span="12" :md="12" class="p-2">
              <label for="เปอร์เซ็นต์"><b class="request">เปอร์เซ็นต์</b></label>
              <a-form-item 
                  ref="refundLostPercent" 
                  name="refundLostPercent"
                  :rules="[{ required: true, message: 'โปรดกรอกชื่อบัญชี!' }]"
                  >
                  <a-input v-model:value="formData.refundLostPercent"/>
              </a-form-item>
          </a-col>
          <a-col :span="12" :md="12" class="p-2">
              <label for="เทิร์น"><b class="request">เทิร์น</b></label>
              <a-form-item 
                  ref="refundLostTurn" 
                  name="refundLostTurn"
                  :rules="[{ required: true, message: 'โปรดกรอกชื่อบัญชี!' }]"
                  >
                  <a-input v-model:value="formData.refundLostTurn"/>
              </a-form-item>
          </a-col>
          <a-col :span="12" :md="12" class="p-2">
            <label for="วิธีคืนยอดเสียให้ลูกค้า"><b class="request">วิธีคืนยอดเสียให้ลูกค้า</b></label>
            <a-select
                v-model:value="formData.typeRefundLostSet"
                style="width: 100%"
                :options="Constants.optionsLoseTypeMember"
            ></a-select>
          </a-col>
          <a-col :span="12" :md="12" class="p-2">
              <label for="คืนสูงสุด"><b  class="request">คืนต่ำสุด</b></label>
              <a-form-item 
                  ref="refundLostMin" 
                  name="refundLostMin"
                  :rules="[{ required: true, message: 'โปรดกรอกชื่อบัญชี!' }]"
                  >
                  <a-input v-model:value="formData.refundLostMin"/>
              </a-form-item>
          </a-col>
          <a-col :span="12" :md="12" class="p-2">
              <label for="คืนสูงสุด"><b  class="request">คืนสูงสุด</b></label>
              <a-form-item 
                  ref="refundLostMax" 
                  name="refundLostMax"
                  :rules="[{ required: true, message: 'โปรดกรอกชื่อบัญชี!' }]"
                  >
                  <a-input v-model:value="formData.refundLostMax"/>
              </a-form-item>
          </a-col>
          <a-col :span="12" :md="12" class="p-2">
            <label for="สถานะคืนยอดเสีย"><b class="request">สถานะคืนยอดเสีย</b></label>
            <a-select
                v-model:value="formData.typeRefundLostdate"
                style="width: 100%"
                :options="Constants.optionsDayOpen"
            ></a-select>
          </a-col>
        </a-row>
        <a-row v-if="formData.typeRefundLostdate == '2'">
            <a-col :span="24" :md="12">
                <div class="select-day">
                    <h3>
                        เลือกวัน
                        <a-checkbox v-model:checked="all" style="float: inline-end;" @change="selectAllLost">เลือกทั้งหมด</a-checkbox>
                    </h3>
                    <a-checkbox-group v-model:value="formData.optionRefundLostDate" :options="Constants.optionWeek" class="model-week">
                        <template #label="{ label }">
                            <p>{{ label }}</p>
                        </template>
                    </a-checkbox-group>
                </div>
            </a-col>
        </a-row>
        <a-row v-if="formData.typeRefundLostdate == '3'">
            <a-col :span="24" :md="12">
                <div class="select-day">
                    <h3>
                        เลือกวันที่
                        <a-checkbox v-model:checked="all" style="float: inline-end;" @change="selectAllLost">เลือกทั้งหมด</a-checkbox>
                    </h3>
                    <a-checkbox-group v-model:value="formData.optionRefundLostDate" :options="Constants.optionDay" class="model-week">
                        <template #label="{ label }">
                            <p>{{ label }}</p>
                        </template>
                    </a-checkbox-group>
                </div>
            </a-col>
        </a-row>
        <h2>เเนะนำเพื่อน</h2>
        <a-row>
          <a-col :span="24" :md="24" class="p-2">
              <a-col :span="24" :md="24">
                <b>สถานะเเนะนำเพื่อน</b> 
              </a-col>
              <a-col :span="24" :md="24" >
                <a-switch v-model:checked="formData.refundLost" />
              </a-col>
          </a-col>
          <a-col :span="12" :md="12" class="p-2">
            <label for="ประเภทการคืน"><b class="request">ประเภทการคืน</b></label>
            <a-select
                v-model:value="formData.typeAffiliate"
                style="width: 100%"
                :options="Constants.optionsLose"
            ></a-select>
          </a-col>
          <a-col :span="12" :md="12" class="p-2">
              <label for="เปอร์เซ็นต์"><b class="request">เปอร์เซ็นต์</b></label>
              <a-form-item 
                  ref="affiliatePercent" 
                  name="affiliatePercent"
                  :rules="[{ required: true, message: 'โปรดกรอกชื่อบัญชี!' }]"
                  >
                  <a-input v-model:value="formData.affiliatePercent"/>
              </a-form-item>
          </a-col>
          <a-col :span="12" :md="12" class="p-2">
              <label for="เทิร์น"><b class="request">เทิร์น</b></label>
              <a-form-item 
                  ref="affiliateTurn" 
                  name="affiliateTurn"
                  :rules="[{ required: true, message: 'โปรดกรอกชื่อบัญชี!' }]"
                  >
                  <a-input v-model:value="formData.affiliateTurn"/>
              </a-form-item>
          </a-col>
          <a-col :span="12" :md="12" class="p-2">
            <label for="วิธีคืนยอดเสียให้ลูกค้า"><b class="request">วิธีคืนยอดเเนะนำเพื่อน</b></label>
            <a-select
                v-model:value="formData.affiliateTypeMemberGet"
                style="width: 100%"
                :options="Constants.optionsLoseTypeMember"
                :disabled="true"
            ></a-select>
          </a-col>
          <a-col :span="12" :md="12" class="p-2">
              <label for="คืนสูงสุด"><b  class="request">คืนต่ำสุด</b></label>
              <a-form-item 
                  ref="affiliateMin" 
                  name="affiliateMin"
                  :rules="[{ required: true, message: 'โปรดกรอกชื่อบัญชี!' }]"
                  >
                  <a-input v-model:value="formData.affiliateMin"/>
              </a-form-item>
          </a-col>
          <a-col :span="12" :md="12" class="p-2">
              <label for="คืนสูงสุด"><b  class="request">คืนสูงสุด</b></label>
              <a-form-item 
                  ref="affiliateMax" 
                  name="affiliateMax"
                  :rules="[{ required: true, message: 'โปรดกรอกชื่อบัญชี!' }]"
                  >
                  <a-input v-model:value="formData.affiliateMax"/>
              </a-form-item>
          </a-col>
          <a-col :span="12" :md="12" class="p-2">
            <label for="สถานะคืนยอดเสีย"><b class="request">สถานะคืนยอดเสีย</b></label>
            <a-select
                v-model:value="formData.typeAffiliateDate"
                style="width: 100%"
                :options="Constants.optionsDayOpen"
            ></a-select>
          </a-col>
        </a-row>
        <a-row v-if="formData.typeAffiliateDate == '2'">
            <a-col :span="24" :md="12">
                <div class="select-day">
                    <h3>
                        เลือกวัน
                        <a-checkbox v-model:checked="all" style="float: inline-end;" @change="selectAllAffiliate">เลือกทั้งหมด</a-checkbox>
                    </h3>
                    <a-checkbox-group v-model:value="formData.optionAffiliateDate" :options="Constants.optionWeek" class="model-week">
                        <template #label="{ label }">
                            <p>{{ label }}</p>
                        </template>
                    </a-checkbox-group>
                </div>
            </a-col>
        </a-row>
        <a-row v-if="formData.typeAffiliateDate == '3'">
            <a-col :span="24" :md="12">
                <div class="select-day">
                    <h3>
                        เลือกวันที่
                        <a-checkbox v-model:checked="all" style="float: inline-end;" @change="selectAllAffiliate">เลือกทั้งหมด</a-checkbox>
                    </h3>
                    <a-checkbox-group v-model:value="formData.optionAffiliateDate" :options="Constants.optionDay" class="model-week">
                        <template #label="{ label }">
                            <p>{{ label }}</p>
                        </template>
                    </a-checkbox-group>
                </div>
            </a-col>
        </a-row>
      </a-tab-pane>
      <a-tab-pane key="4" tab="การเเจ้งเตือน">Content of Tab Pane 2</a-tab-pane>
    </a-tabs>
    <br>
    <a-row justify="end">
      <a-button type="primary" class="sky" >บันทึก</a-button>
    </a-row>
  </template>
  <script lang="ts" setup>
  import { ref } from 'vue';
  import type { UploadChangeParam } from 'ant-design-vue';
  import * as Constants from '../Constants/Constants';

  const all = ref(false);

  const activeKey = ref('3');
  const fileList = ref([]);
  const fileListLogo = ref([]);
  const previewImage = ref('');
  const previewImageLogo = ref('');
  const ImageText = ref(true);
  const ImageTextLogo = ref(true);

  let formData = reactive({
      product: 1,
      titleWebsite:'',
      discriptionsWebsite:'',
      websiteKeyword:'',
      websiteUrl:'',
      clearWithdrawMin:5,
      turnWithdrawNormal:0,
      imageWebsite: null as any,
      imageLogoWebsite: null as any,
      password: 'asdf123456',
      openUsername: true,
      getNameMember: true,
      checkName: true,
      regisTrue: true,
      depositAuto: true,
      memberCreateDeposit: true,
      depositMin: '1',
      depositMax: '50000',
      statusWithdraw: true,
      withdrawAll: true,
      withdrawMin: 100,
      withdrawAroundMax: 1000,
      withdrawAroundDay: 100000,
      withdrawAround: 20,
      refundLost:true,
      typeRefundLost:1,
      refundLostPercent:4,
      refundLostTurn:1,
      typeRefundLostSet:1,
      refundLostMin:0,
      refundLostMax:1000,
      typeRefundLostdate:'1',
      optionRefundLostDate: [] as string[],
      affiliate:true,
      typeAffiliate:1,
      affiliatePercent:1,
      affiliateTurn:1,
      affiliateTypeMemberGet:'1',
      affiliateMin:0,
      affiliateMax:0,
      typeAffiliateDate:'1',
      optionAffiliateDate: [] as string[],
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
                  formData.imageWebsite = base64String;
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

  const handleChangeLogo = async (info: UploadChangeParam) => {
      const status = info.file.status;
      const file = info.file.originFileObj; // File object

      if (file instanceof File) {
          const reader = new FileReader();

          reader.onload = () => {
              const base64String = reader.result as string;
              if (base64String) {
                  previewImageLogo.value = base64String;
                  formData.imageLogoWebsite = base64String;
              }
          };
          ImageTextLogo.value = false;
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

  const clearPreviewImage = () => {
    previewImage.value = '';
    fileList.value = [];
    ImageText.value = true;
  };

  const clearPreviewImageLogo = () => {
    previewImageLogo.value = '';
    fileListLogo.value = [];
    ImageTextLogo.value = true;
  };

  const selectAllLost = () =>{
        if(formData.typeRefundLostdate == '2'){
            if(all.value){
                formData.optionRefundLostDate = ['อา','จ','อ','พ','พฤ','ศ','ส'];
            }else{
                formData.optionRefundLostDate = []
            }
        }else if(formData.typeRefundLostdate == '3'){
            if(all.value){
            formData.optionRefundLostDate = Array.from({ length: 31 }, (_, index) => (index + 1).toString());
            }else{
                formData.optionRefundLostDate = []
            }
        }
    }

    const selectAllAffiliate = () =>{
        if(formData.typeAffiliateDate == '2'){
            if(all.value){
                formData.optionAffiliateDate = ['อา','จ','อ','พ','พฤ','ศ','ส'];
            }else{
                formData.optionAffiliateDate = []
            }
        }else if(formData.typeAffiliateDate == '3'){
            if(all.value){
            formData.optionAffiliateDate = Array.from({ length: 31 }, (_, index) => (index + 1).toString());
            }else{
                formData.optionAffiliateDate = []
            }
        }
    }

  </script>
  <style>
  .preview-image-container{
      position: relative;
  }
  .close-image {
    position: absolute;
    top: 2rem;
    right: 1rem;
    cursor: pointer;
    font-size: 25px;
    z-index: 999;
    color:#14b6c9
  }
  .text-label-turn{
      font-weight: 500;
  }
  </style>
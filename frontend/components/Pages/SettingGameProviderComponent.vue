<template>
    <a-tabs v-model:activeKey="activeKey" type="card">
      <a-tab-pane key="1" tab="ตั้งค่าค่ายเกมส์">
        <a-row>
          <h2>ตั้งค่าเมนู</h2>
          <a-col :span="24" :md="24">
              <a-row justify="center">
                <a-col :span="8" :md="2" class="p-1">
                  <div class="center">
                    <a-image
                      width="100%"
                      src="https://cdn-cns.sgp1.cdn.digitaloceanspaces.com/image/menu-game/casino.png"
                      :preview="false"
                    />
                    <h3>Casino</h3>
                    <a-switch v-model:checked="formData.casinoStatus" />
                  </div>
                </a-col>
                <a-col :span="8" :md="2" class="p-1">
                  <div class="center">
                    <a-image
                      width="100%"
                      src="https://cdn-cns.sgp1.cdn.digitaloceanspaces.com/image/menu-game/slot.png"
                      :preview="false"
                    />
                    <h3>GameSlot</h3>
                    <a-switch v-model:checked="formData.casinoStatus" />
                  </div>
                </a-col>
                <a-col :span="8" :md="2" class="p-1">
                  <div class="center">
                    <a-image
                      width="100%"
                      src="https://cdn-cns.sgp1.cdn.digitaloceanspaces.com/image/menu-game/slot.png"
                      :preview="false"
                    />
                    <h3>Fishing</h3>
                    <a-switch v-model:checked="formData.casinoStatus" />
                  </div>
                </a-col>
                <a-col :span="8" :md="2" class="p-1">
                  <div class="center">
                    <a-image
                      width="100%"
                      src="https://cdn-cns.sgp1.cdn.digitaloceanspaces.com/image/menu-game/sport.png"
                      :preview="false"
                    />
                    <h3>Sport</h3>
                    <a-switch v-model:checked="formData.casinoStatus" />
                  </div>
                </a-col>
                <a-col :span="8" :md="2" class="p-1">
                  <div class="center">
                    <a-image
                      width="100%"
                      src="https://cdn-cns.sgp1.cdn.digitaloceanspaces.com/image/menu-game/trading.png"
                      :preview="false"
                    />
                    <h3>Trading</h3>
                    <a-switch v-model:checked="formData.casinoStatus" />
                  </div>
                </a-col>
                <a-col :span="8" :md="2" class="p-1">
                  <div class="center">
                    <a-image
                      width="100%"
                      src="https://cdn-cns.sgp1.cdn.digitaloceanspaces.com/image/menu-game/poker.png"
                      :preview="false"
                    />
                    <h3>Card</h3>
                    <a-switch v-model:checked="formData.casinoStatus" />
                  </div>
                </a-col>
                <a-col :span="8" :md="2" class="p-1">
                  <div class="center">
                    <a-image
                      width="100%"
                      src="https://cdn-cns.sgp1.cdn.digitaloceanspaces.com/image/menu-game/lottery.png"
                      :preview="false"
                    />
                    <h3>LOTTO</h3>
                    <a-switch v-model:checked="formData.casinoStatus" />
                  </div>
                </a-col>

              </a-row>
          </a-col>
          <br>
          <h2>ตั้งค่าเกมส์</h2>
          <a-col :span="24" :md="24">
            <h3>Casino</h3>
            <a-row>
              <a-col :span="8" :md="2" class="p-1 ssss" v-for="game in formData.game.CASINO">
                <div class="center">
                  <a-image
                    width="100%"
                    :src="game.image"
                    :preview="false"
                  />
                  <p>{{game.name}}</p>
                  <a-switch v-model:checked="formData.casinoStatus" />
                </div>
              </a-col>
            </a-row>
          </a-col>

          <a-col :span="24" :md="24">
            <h3>GameSlot</h3>
            <a-row>
              <a-col :span="8" :md="2" class="p-1 ssss" v-for="game in formData.game.SLOT">
                <div class="center">
                  <a-image
                    width="100%"
                    :src="game.image"
                    :preview="false"
                  />
                  <p>{{game.name}}</p>
                  <a-switch v-model:checked="formData.casinoStatus" />
                </div>
              </a-col>
            </a-row>
          </a-col>

          <a-col :span="24" :md="24">
            <h3>Fishing</h3>
            <a-row>
              <a-col :span="8" :md="2" class="p-1 ssss" v-for="game in formData.game.FISH">
                <div class="center">
                  <a-image
                    width="100%"
                    :src="game.image"
                    :preview="false"
                  />
                  <p>{{game.name}}</p>
                  <a-switch v-model:checked="formData.casinoStatus" />
                </div>
              </a-col>
            </a-row>
          </a-col>

          <a-col :span="24" :md="24">
            <h3>Sport</h3>
            <a-row>
              <a-col :span="8" :md="2" class="p-1 ssss" v-for="game in formData.game.FOOTBALL">
                <div class="center">
                  <a-image
                    width="100%"
                    :src="game.image"
                    :preview="false"
                  />
                  <p>{{game.name}}</p>
                  <a-switch v-model:checked="formData.casinoStatus" />
                </div>
              </a-col>
            </a-row>
          </a-col>

          <a-col :span="24" :md="24">
            <h3>Trading</h3>
            <a-row>
              <a-col :span="8" :md="2" class="p-1 ssss" v-for="game in formData.game.TRADE">
                <div class="center">
                  <a-image
                    width="100%"
                    :src="game.image"
                    :preview="false"
                  />
                  <p>{{game.name}}</p>
                  <a-switch v-model:checked="formData.casinoStatus" />
                </div>
              </a-col>
            </a-row>
          </a-col>
          
          <a-col :span="24" :md="24">
            <h3>CARD</h3>
            <a-row>
              <a-col :span="8" :md="2" class="p-1 ssss" v-for="game in formData.game.POKER">
                <div class="center">
                  <a-image
                    width="100%"
                    :src="game.image"
                    :preview="false"
                  />
                  <p>{{game.name}}</p>
                  <a-switch v-model:checked="formData.casinoStatus" />
                </div>
              </a-col>
            </a-row>
          </a-col>

          <a-col :span="24" :md="24">
            <h3>LOTTO</h3>
            <a-row>
              <a-col :span="8" :md="2" class="p-1 ssss" v-for="game in formData.game.LOTTO">
                <div class="center">
                  <a-image
                    width="100%"
                    :src="game.image"
                    :preview="false"
                  />
                  <p>{{game.name}}</p>
                  <a-switch v-model:checked="formData.casinoStatus" />
                </div>
              </a-col>
            </a-row>
          </a-col>

          <a-col :span="24" :md="24">
            <h3>KENO</h3>
            <a-row>
              <a-col :span="8" :md="2" class="p-1 ssss" v-for="game in formData.game.KENO">
                <div class="center">
                  <a-image
                    width="100%"
                    :src="game.image"
                    :preview="false"
                  />
                  <p>{{game.name}}</p>
                  <a-switch v-model:checked="formData.casinoStatus" />
                </div>
              </a-col>
            </a-row>
          </a-col>

        </a-row>
      </a-tab-pane>
    </a-tabs>
  </template>
  <script lang="ts" setup>
  import { ref } from 'vue';
  // import * as Constants from '../Constants/Constants';
  import { getSettingGameServices } from '~/services/settingGameService';

  const activeKey = ref('1');

  let formData = reactive({
    casinoStatus: true,
    game: [] as any,
  })
  const getSettingGame = async () =>{
    const data = await getSettingGameServices();
    if (data.status === "success") {
      formData.game = data.data
    }
  }
  onMounted(() => {
    getSettingGame();
    });
    
  </script>
<template>
  <div>
    <ExtTabPanel :tabs="tabs">
      <!-- General Settings Tab -->
      <template #tab-0>
        <ExtPanel title="General Settings" icon="&#128295;" :collapsible="true">
          <fieldset class="ext-fieldset">
            <legend>Application</legend>
            <div class="ext-form-field">
              <label>App Name:</label>
              <div class="field-body">
                <input v-model="settings.appName" type="text" />
              </div>
            </div>
            <div class="ext-form-field">
              <label>Description:</label>
              <div class="field-body">
                <textarea v-model="settings.description" rows="3"></textarea>
              </div>
            </div>
            <div class="ext-form-field">
              <label>Language:</label>
              <div class="field-body">
                <select v-model="settings.language">
                  <option value="en">English</option>
                  <option value="zh">中文</option>
                  <option value="ja">日本語</option>
                  <option value="ko">한국어</option>
                </select>
              </div>
            </div>
            <div class="ext-form-field">
              <label>Timezone:</label>
              <div class="field-body">
                <select v-model="settings.timezone">
                  <option value="UTC">UTC</option>
                  <option value="US/Eastern">US Eastern</option>
                  <option value="US/Pacific">US Pacific</option>
                  <option value="Europe/London">Europe/London</option>
                  <option value="Asia/Shanghai">Asia/Shanghai</option>
                  <option value="Asia/Tokyo">Asia/Tokyo</option>
                </select>
              </div>
            </div>
          </fieldset>

          <fieldset class="ext-fieldset">
            <legend>Display</legend>
            <div class="ext-form-field">
              <label>Theme:</label>
              <div class="field-body">
                <select v-model="settings.theme">
                  <option value="classic">Classic (ExtJS)</option>
                  <option value="neptune">Neptune</option>
                  <option value="triton">Triton</option>
                </select>
              </div>
            </div>
            <div class="ext-form-field">
              <label>Items per page:</label>
              <div class="field-body">
                <input v-model.number="settings.pageSize" type="number" min="5" max="100" />
                <div class="field-help">Number of records displayed per page in grids (5-100)</div>
              </div>
            </div>
          </fieldset>

          <div style="text-align: right; padding-top: 8px;">
            <button class="ext-btn ext-btn-primary" @click="saveSettings">&#10003; Save Settings</button>
            <button class="ext-btn" @click="resetSettings" style="margin-left: 6px;">&#8634; Reset</button>
          </div>
        </ExtPanel>
      </template>

      <!-- Email Settings Tab -->
      <template #tab-1>
        <ExtPanel title="Email Configuration" icon="&#9993;">
          <fieldset class="ext-fieldset">
            <legend>SMTP Server</legend>
            <div class="ext-form-field">
              <label>SMTP Host:</label>
              <div class="field-body">
                <input v-model="emailSettings.smtpHost" type="text" placeholder="smtp.example.com" />
              </div>
            </div>
            <div class="ext-form-field">
              <label>Port:</label>
              <div class="field-body">
                <input v-model.number="emailSettings.smtpPort" type="number" style="width: 100px;" />
              </div>
            </div>
            <div class="ext-form-field">
              <label>Username:</label>
              <div class="field-body">
                <input v-model="emailSettings.username" type="text" />
              </div>
            </div>
            <div class="ext-form-field">
              <label>Password:</label>
              <div class="field-body">
                <input v-model="emailSettings.password" type="password" />
              </div>
            </div>
            <div class="ext-form-field">
              <label>Encryption:</label>
              <div class="field-body">
                <select v-model="emailSettings.encryption">
                  <option value="none">None</option>
                  <option value="ssl">SSL</option>
                  <option value="tls">TLS</option>
                </select>
              </div>
            </div>
          </fieldset>

          <div style="text-align: right; padding-top: 8px;">
            <button class="ext-btn" @click="testEmail">&#9993; Test Connection</button>
            <button class="ext-btn ext-btn-primary" style="margin-left: 6px;">&#10003; Save</button>
          </div>
        </ExtPanel>
      </template>

      <!-- Security Tab -->
      <template #tab-2>
        <ExtPanel title="Security Settings" icon="&#128274;">
          <fieldset class="ext-fieldset">
            <legend>Password Policy</legend>
            <div class="ext-form-field">
              <label>Min Length:</label>
              <div class="field-body">
                <input v-model.number="securitySettings.minPasswordLength" type="number" min="6" max="32" style="width: 100px;" />
              </div>
            </div>
            <div class="ext-form-field">
              <label>Require Uppercase:</label>
              <div class="field-body" style="padding-top: 5px;">
                <input v-model="securitySettings.requireUppercase" type="checkbox" />
              </div>
            </div>
            <div class="ext-form-field">
              <label>Require Numbers:</label>
              <div class="field-body" style="padding-top: 5px;">
                <input v-model="securitySettings.requireNumbers" type="checkbox" />
              </div>
            </div>
            <div class="ext-form-field">
              <label>Require Symbols:</label>
              <div class="field-body" style="padding-top: 5px;">
                <input v-model="securitySettings.requireSymbols" type="checkbox" />
              </div>
            </div>
          </fieldset>

          <fieldset class="ext-fieldset">
            <legend>Session</legend>
            <div class="ext-form-field">
              <label>Timeout (min):</label>
              <div class="field-body">
                <input v-model.number="securitySettings.sessionTimeout" type="number" min="5" max="1440" style="width: 100px;" />
                <div class="field-help">Session timeout in minutes (5-1440)</div>
              </div>
            </div>
            <div class="ext-form-field">
              <label>Max Attempts:</label>
              <div class="field-body">
                <input v-model.number="securitySettings.maxLoginAttempts" type="number" min="1" max="20" style="width: 100px;" />
                <div class="field-help">Maximum failed login attempts before lockout</div>
              </div>
            </div>
          </fieldset>

          <div style="text-align: right; padding-top: 8px;">
            <button class="ext-btn ext-btn-primary">&#10003; Save</button>
          </div>
        </ExtPanel>
      </template>
    </ExtTabPanel>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ExtPanel from '@/components/ExtPanel.vue'
import ExtTabPanel from '@/components/ExtTabPanel.vue'

const tabs = [
  { title: 'General', icon: '&#128295;' },
  { title: 'Email', icon: '&#9993;' },
  { title: 'Security', icon: '&#128274;' },
]

const settings = ref({
  appName: 'Tabler Vue App',
  description: 'A Vue 3 application using Tabler styles with ExtJS Classic theme',
  language: 'en',
  timezone: 'UTC',
  theme: 'classic',
  pageSize: 20,
})

const emailSettings = ref({
  smtpHost: 'smtp.example.com',
  smtpPort: 587,
  username: '',
  password: '',
  encryption: 'tls',
})

const securitySettings = ref({
  minPasswordLength: 8,
  requireUppercase: true,
  requireNumbers: true,
  requireSymbols: false,
  sessionTimeout: 30,
  maxLoginAttempts: 5,
})

function saveSettings() {
  // Placeholder
}

function resetSettings() {
  settings.value = {
    appName: 'Tabler Vue App',
    description: 'A Vue 3 application using Tabler styles with ExtJS Classic theme',
    language: 'en',
    timezone: 'UTC',
    theme: 'classic',
    pageSize: 20,
  }
}

function testEmail() {
  // Placeholder
}
</script>

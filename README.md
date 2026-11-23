# Transfer Wave Demo

Интерактивное демо перехода между подтверждением перевода и экраном успеха. Анимация запускается кнопкой «Перевести»; кнопка «Готово» мгновенно возвращает первый экран.

## Запуск

Нужны Node.js 18+ и pnpm.

```bash
pnpm install
pnpm dev
```

Откройте адрес, который выведет Vite (обычно `http://localhost:5173`).

## Сборка

```bash
pnpm build
pnpm preview
```

Параметры эффекта находятся в объекте `transferWaveStyle` в `src/main.jsx`. Верстка и цвета — в файлах `src/styles.css` и `src/figma-overrides.css`.

Демо использует React, Vite и пакет [`distortion-waves`](https://libraries.dev/waves).

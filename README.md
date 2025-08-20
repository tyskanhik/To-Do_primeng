# To-Do List приложение на Angular

Современное To-Do List приложение, разработанное с использованием Angular 20+ и PrimeNG для UI компонентов. Приложение позволяет управлять задачами: создавать, редактировать, удалять и отмечать как выполненные. Все данные сохраняются в локальном хранилище браузера.

## 🚀 Особенности

*   **Реактивные формы** с валидацией.
*   **Диалоговые окна** для создания и редактирования задач.
*   **Локальное сохранение данных** с помощью Local Storage.
*   **Фильтрация задач** по категориям.

## 🛠 Технологии

*   **Angular 20+**
*   **PrimeNG**
*   **TypeScript**
*   **RxJS**
*   **Local Storage API**

## 📦 Установка и запуск

1.  **Клонируйте репизиторий:**
    ```bash
    git clone <https://github.com/tyskanhik/To-Do_primeng.git>
    cd To-Do_primeng
    ```

2.  **Установите зависимости:**
    ```bash
    npm install
    ```

3.  **Запустите приложение:**
    ```bash
    ng serve
    ```

4.  **Откройте браузер** и перейдите по адресу `http://localhost:4200`.

## 📁 Структура проекта

### Модели данных

Модели задач находятся в `src/app/core/models/task.model.ts`:

```typescript
export  const  TaskCategory  = {
	STUDIES:  'Учеба',
	WORK:  'Работа',
	HOME:  'Дом'
} as  const;
export  type  TaskCategory  =  typeof  TaskCategory[keyof  typeof  TaskCategory];

export  const  TaskPriority  = {
	LOW:  'low',
	MEDIUM:  'medium',
	HIGHT:  'hight'
} as  const;
export  type  TaskPriority  =  typeof  TaskPriority[keyof  typeof  TaskPriority];

export  interface  Task {
	id:  string;
	title:  string;
	category:  TaskCategory;
	priority:  TaskPriority;
	completed:  boolean;
	createdAt:  Date;
}

export  type  NewTask  =  Omit<Task, 'id'  |  'createdAt'  |  'completed'>;
export  type  TaskFilter  =  'all'  |  TaskCategory;
```
### Утилиты
Кастомный тип  `ToFormControls`  для типизации реактивных форм

```typescript
import { FormControl } from "@angular/forms";

export type ToFormControls<T> = {
  [K in keyof T]: FormControl<T[K] | null>;
};
```
### Сервисы
**`TaskService`**  отвечает за управление задачами
**storage-service** Данные автоматически сохраняются в **Local Storage** при каждом изменении и загружаются при инициализации приложения.
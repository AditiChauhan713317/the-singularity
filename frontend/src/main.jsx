import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { NoteContextProvider } from './context/NoteContext.jsx'
import { TodoContextProvider } from './context/TodoContext.jsx'
import { BookmarkContextProvider } from './context/BookmarkContext.jsx'
import {TransactionContextProvider } from './context/TransactionContext.jsx'
import { PomodoroContextProvider } from './context/PomodoroContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <NoteContextProvider>
        <TodoContextProvider>
          <BookmarkContextProvider>
            <TransactionContextProvider>
              <PomodoroContextProvider>

                <App />
                
              </PomodoroContextProvider>
            </TransactionContextProvider>
          </BookmarkContextProvider>
        </TodoContextProvider>
      </NoteContextProvider>
    </AuthContextProvider>
    
  </StrictMode>,
)

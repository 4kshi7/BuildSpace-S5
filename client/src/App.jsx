import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Cursor from "./components/Cursor/Cursor";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ChatBot2 from "./components/ChatBot/Chatbox2";
import Profile from "./components/Profile/Profile";
import PomodoroTimer from "./components/Pomodoro/Pomodoro";
import WriteJournal from "./components/Journals/WriteJournal";
import ViewJournal from "./components/Journals/ViewJournal";
import AllJournals from "./components/Journals/AllJournals";
import ViewPost from "./components/Community Posts/ViewPost";
import WritePost from "./components/Community Posts/WritePost";
import AllPosts from "./components/Community Posts/AllPosts";
import MusicPlayer from "./components/Music/MusicPlayer";
import AudioPlayer from "./components/Music/AudioPlayer";


function App() {
  return (
    <>
      <Router>
        <div className="App cursor-none ">
          <AudioPlayer/>
          <Cursor />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ChatBot" element={<ChatBot2 />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/pomodoro" element={<PomodoroTimer />} />
            <Route path="/write-post" element={<WritePost />} />
            <Route path="/edit-post/:id" element={<WritePost />} />
            <Route path="/post/:id" element={<ViewPost />} />
            <Route path="/posts" element={<AllPosts/>} />
            <Route path="/journals" element={<AllJournals />} />
            <Route path="/write-journal" element={<WriteJournal />} />
            <Route path="/edit-journal/:id" element={<WriteJournal />} />
            <Route path="/journal/:id" element={<ViewJournal />} />
            <Route path="/music" element={<MusicPlayer />} />
         
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;

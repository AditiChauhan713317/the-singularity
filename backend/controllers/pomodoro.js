import Pomodoro from '../models/pomodoro.js';

const getDateOnly = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

// create a new or update an existing one
const logPomodoroSession  = async (req, res) => {
    
    const userId = req.user._id;

    const {start, end, duration} = req.body; 

    if (!start || !end || !duration) {
        return res.status(400).json({ error: 'Missing session fields' });
    }

    const startDate = new Date(start);
    const endDate = new Date(end);


    try {
        const startDay = getDateOnly(startDate).toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
        console.log("startDay:::::", startDay);
        const p_session = await Pomodoro.findOne({userId, date: startDay});
        // no today's session
        if(!p_session) {
            const session = await Pomodoro.create({
                userId, date: startDay, 
                sessions: [{ start: startDate, end: endDate, duration }], // an array of sessions
                totalTime: duration});
            return res.status(200).json(session);  
        }
        
        // today's session already exists
        p_session.sessions.push({ start: startDate, end: endDate, duration });
        // Recalculate totalTime
        p_session.totalTime = p_session.sessions.reduce((acc, s) => acc + s.duration, 0);
        // save it
        await p_session.save();
        res.status(200).json(p_session);
        
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}

// delete pomodoro doucment

const deletePomodoroSession = async (req, res) => {

    const {id} = req.params; 

    try {
        const session = await Pomodoro.findByIdAndDelete(id);
        if(!session) {
            return res.status(404).json({error: 'No such session found'});
        }
        res.status(200).json(session);
    } catch (error) {
        res.status(400).json({error: error.message});
    }

}

// get sessions for a particular date
const getSessions = async (req, res) => {

    const userId = req.user._id;
    const {date} = req.query; // not req.body; (get route dont have body)

    const startDay = getDateOnly(new Date(date)).toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
    console.log("day::::::", startDay);

    try {
        const session = await Pomodoro.findOne({userId, date: startDay});
        if(!session) {
            return res.status(404).json({error: 'No session found for this date'});
        }
        res.status(200).json(session);
    } catch (error) {
        res.status(400).json({error: error.message});
    }

}



export {logPomodoroSession, deletePomodoroSession, getSessions};
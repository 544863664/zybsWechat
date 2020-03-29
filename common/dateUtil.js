
import moment from 'moment';

const dateUtil = {
    formatDate1(date){
        if(date){
            return moment(date, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD');
        }else{
            return "";
        }
    },

    formatDate2(date){
        if(date){
            return moment(date, 'YYYY-MM-DD').format('YYYY-MM-DD HH:mm:ss');
        }else{
            return "";
        }
    },
    
    formatDate3(date){
        if(date){
            return moment(date).format('YYYY-MM-DD');
        }else{
            return "";
        }
    },
    
    formatDate4(date){
        if(date){
            return moment(date).format('YYYY-MM-DD HH:mm:ss');
        }else{
            return "";
        }
    }
    
}

export default dateUtil;

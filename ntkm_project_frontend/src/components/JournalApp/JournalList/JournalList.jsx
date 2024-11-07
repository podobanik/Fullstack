import './JournalList.css';
import CardButton from '../CardButton/CardButton';
import JournalItem from '../JournalItem/JournalItem';
import { useMemo } from 'react';
import { useValue } from '../../../context/ContextProvider';


function JournalList({ setSelectedItem }) {
	
	const {
    state: { journals, folders, userInfo, folder }
  	} = useValue();


	const sortJournals = (a, b) => {
		if (a.change_date < b.change_date) {
			return 1;
		} else {
			return -1;
		}
	};
	
	const filteredJournals = useMemo(() => {
		if (folder === '1'){
			return journals?.filter(el => (el.user?.id === userInfo.id) && (el.folder?.id === folder)).sort(sortJournals);
		} else {
			return journals?.filter(el => (el.user?.id === userInfo.id)).sort(sortJournals);
		}
	}, [journals, userInfo, folders]);

	if (journals?.length === 0 || journals?.filter(el => (el.user?.id === userInfo.id)).length === 0) {
		return <p>Записей пока нет, добавьте первую</p>;
	}
	

	return	<>
		{filteredJournals?.map(el => (
				<CardButton key={el.id} onClick={() => setSelectedItem(el)}>
					<JournalItem 
						title={el.title}
						post={el.post}
						add_date={el.add_date}
						change_date={el.change_date}
						folder={el.folder?.name}
						user={`${el.user?.profile?.last_name} ${el.user?.profile?.first_name} ${el.user?.profile?.second_name}`}
					/>
				</CardButton>
			))}
	</>;
}

export default JournalList;
import { useAtomValue } from 'jotai';
import { FC, MouseEvent, useEffect, useRef, useState } from 'react';
import { FaStar } from 'react-icons/fa';

import { Button, Search } from '../common';
import { Results } from '../result';
import { AgentStyleMap, ClassTag, getAgentInfo } from '../utils';
import { AgentItem, CurrentViewAtom, FilterAtom } from '../../atoms';

type AgentGalleryProps = {
  agents: AgentItem[];
  loading: boolean;
  calculate: () => void;
  favorite: (agent: AgentItem) => void;
  select: (agent: AgentItem) => void;
  toggleModal: (agent: AgentItem) => void;
  contextMenuHandler: (event: MouseEvent, agent: AgentItem) => void;
};

export const AgentGallery: FC<AgentGalleryProps> = ({
  agents,
  loading,
  calculate,
  favorite,
  select,
  toggleModal,
  contextMenuHandler
}) => {
  const viewName = useAtomValue(CurrentViewAtom);
  const filter = useAtomValue(FilterAtom);
  const [showResults, setShowResults] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const [loadedIndexes, setLoadedIndexes] = useState<number[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            setLoadedIndexes((prev) => [...prev, index]);
            observer.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: '-80px', threshold: 0 }
    );

    const cards = containerRef.current?.querySelectorAll('.card');
    cards?.forEach((card, index) => {
      observer.observe(card);
      card.setAttribute('data-index', String(index));
    });

    return () => observer.disconnect();
  }, [agents, filter]);

  const renderAgentCard = (agent: AgentItem, index: number) => {
    const {
      name,
      options: {
        isFavorite,
        [viewName]: { isSelected }
      }
    } = agent;
    const { title, bio, className } = getAgentInfo(name);

    const cardImageStyle = {
      ...AgentStyleMap[name as keyof typeof AgentStyleMap],
      backgroundImage: `url(agents/${name.replace(/\s/g, '')}.webp)`
    };

    return (
      <div key={name} className="col" style={{ minWidth: '350px', maxWidth: '350px' }}>
        <div className="card card--slide-up" onContextMenu={(event: MouseEvent) => contextMenuHandler(event, agent)}>
          <div className="u-absolute w-5 h-5 u-z-1">
            <span
              className="u-absolute favorite"
              style={{ top: '0.75rem', right: '1rem' }}
              onClick={() => favorite(agent)}
            >
              <FaStar size={20} className={`favorite-star hover-grow-extreme ${isFavorite ? 'active' : ''}`} />
            </span>
          </div>
          <div className="card__container">
            {loadedIndexes.includes(index) && <div className="card__image" style={cardImageStyle} />}
          </div>
          <div className="card__mobile-title">
            <div className="content pl-2 pr-2">
              <div className="tile">
                <div className="tile__container row">
                  <div className="col">
                    <p className="tile__title">{name}</p>
                    <p className="tile__subtitle">{title}</p>
                  </div>
                </div>
                <div className="col pt-1">
                  <div className={`tag tag--sm ${ClassTag[className]}`}>{className}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="card__body content" style={{ width: '90%' }}>
            <p>{bio}</p>
          </div>
          <div className="card__action-bar u-center">
            <Button
              text={isSelected ? 'Selected' : 'Select'}
              color={isSelected ? 'primary' : 'transparent'}
              onClick={() => select(agent)}
            />
            <Button text="Edit" color="transparent" onClick={() => toggleModal(agent)} />
          </div>
        </div>
      </div>
    );
  };

  const selectedAgents = agents.filter((agent) => agent.options[viewName].isSelected);

  return (
    <div className="tree-nav-container h-auto" style={{ flexGrow: 1 }}>
      <main>
        <div className="u-flex u-sticky teamfinder-search">
          <Button
            text={showResults ? 'Back' : 'Calculate'}
            className="my-1 px-5"
            disabled={selectedAgents.length === 0 && !showResults}
            onClick={() => {
              setShowResults((prev) => !prev);

              if (showResults) {
                return;
              }

              calculate();
            }}
          />
          <Search />
        </div>

        {showResults ? (
          <Results calculate={calculate} loading={loading} contextMenuHandler={contextMenuHandler} />
        ) : (
          <div className="row u-center" ref={containerRef}>
            {agents.length ? agents.map(renderAgentCard) : <p>No results found...</p>}
          </div>
        )}
      </main>
    </div>
  );
};

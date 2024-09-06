<script lang="ts">
	import type { LangType } from '$lib';

	export let lang: LangType;

	import '../../scss/text.scss';
</script>

<div id="map-text">
	{#if lang === 'uk'}
		<h3>Мапа європейських активів росіян, пов'язаних з виробництвом озброєння</h3>
		<p>
			Росіяни, пов’язані з виробництвом озброєння, продовжують володіти нерухомістю та бізнесами у
			країнах Європейського Союзу, США та Великій Британії. Тоді як санкційна політика проти росії
			внаслідок обмеженості ресурсів профільних органів не здатна охопити всі мережі людей, які
			працюють на військово-промисловий комплекс країни-агресора, внести під санкції всіх осіб та
			заморозити всі активи.
		</p>

		<p>
			З метою висвітлення роботи таких мереж та їхніх активів у країнах ЄС, США та Великій Британії
			проєкт Trap Aggressor аналітичного центру StateWatch зібрав дані та опублікував мапу
			європейських активів росіян, пов'язаних з виробництвом озброєння.
		</p>

		<p>
			У першій ітерації до мапи увійшли європейські активи мереж виробників безпілотників та іншого
			озброєння в росії. Посилання на журналістські розслідування про ці мережі, а також фотографії,
			адреси активів та описи власників можна знайти на картках кожного з активів.
		</p>

		<p>
			Мапа підготовлена за участі видання «<a href="https://texty.org.ua" target="_blank"
				>Тексти.org.ua</a
			>».
		</p>
	{:else}
		<h3>A map of European assets owned by Russians involved in weapons production</h3>
		<p>
			Russians associated with weapons production continue to own real estate and businesses in the
			European Union, the United States and the United Kingdom. At the same time, the sanctions
			policy against Russia, due to the limited resources of the relevant authorities, is unable to
			cover all networks of people working for the military-industrial complex of the aggressor
			country, to sanction all individuals and freeze all assets.
		</p>

		<p>
			In order to highlight the work of such networks and their assets in the EU, the US, and the
			UK, the Trap Aggressor project of the think tank StateWatch collected data and published a map
			of Russian arms production-related assets in Europe.
		</p>

		<p>
			In the first iteration, the map included the European assets of networks of drone and other
			weapons manufacturers in Russia. Links to journalistic investigations about these networks, as
			well as photos, addresses of the assets and descriptions of the owners, can be found on the
			cards of each asset.
		</p>

		<p>
			The map was prepared with the assistance of the media <a
				href="https://texty.org.ua/tag/eng/"
				target="_blank">«Texty.org.ua</a
			>».
		</p>
	{/if}
</div>
